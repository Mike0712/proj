<?php

namespace App\Requests;

use App\Requests\Types\Standard;
use App\Serializer\DebtNormalizer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PropertyInfo\Extractor\PhpDocExtractor;
use Symfony\Component\PropertyInfo\Extractor\ReflectionExtractor;
use Symfony\Component\PropertyInfo\PropertyInfoExtractor;
use Symfony\Component\Serializer\Exception\NotNormalizableValueException;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class BaseRequest
{
    protected array $messages = ['message' => 'validation_failed', 'errors' => []];

    public function __construct(
        protected ValidatorInterface $validator,
        protected TranslatorInterface $translator,
        protected EntityManagerInterface $entityManager
    ) {}

    public function validate(string $class): object
    {
        $object = $this->populate($class);
        $errors = $this->validator->validate($object);

        /** @var ConstraintViolation  */
        foreach ($errors as $message) {
            $this->messages['errors'][] = [
                'property' => $message->getPropertyPath(),
                'value' => $message->getInvalidValue(),
                'message' => $message->getMessage(),
            ];
        }

        $this->sendErrorIfHasMessages();

        return $object;
    }

    public function getRequest(): Request
    {
        return Request::createFromGlobals();
    }

    protected function populate(string $class): object
    {
        $params = $this->getRequest()->toArray();
        try {
            switch ($class) {
                case DebtRequest::class:
                default:
                    $data = (new Standard())->denormalize($params, $class, $this->entityManager);
            }

            return $data;
        } catch (NotNormalizableValueException $exception) {
            $property = $exception->getPath();
            $expectedTypes = $exception->getExpectedTypes();

            $this->messages['errors'][] = $this->setErrors(
                $property,
                isset($params[$property]) ? $params[$property] : null,
                $this->translator->trans(
                    'The type of the "%property%" attribute must be one of "%expectedType%" ("%currentType%" given).',
                    [
                        '%property%' => $property,
                        '%expectedType%' => is_array($expectedTypes) ? implode(', ', $expectedTypes) : $expectedTypes,
                        '%currentType%' => $exception->getCurrentType(),
                    ]
                )
            );
        } catch (\Exception $exception) {
            $this->messages['errors'][] = $this->setErrors(null, null, $exception->getMessage());
        }

        $this->sendErrorIfHasMessages();

        return new $class;
    }

    protected function sendErrorIfHasMessages(): void
    {
        if (isset($this->messages['errors']) && count($this->messages['errors']) > 0) {
            $response = new JsonResponse($this->messages, 201);
            $response->send();

            exit;
        }
    }

    protected function setErrors(?string $property, ?string $value, ?string $message): array
    {
        $data = [];

        if (!empty($property)) {
            $data['property'] = $property;
        }

        if (!empty($value)) {
            $data['value'] = $value;
        }

        if (!empty($message)) {
            $data['message'] = $message;
        }

        return $data;
    }
}