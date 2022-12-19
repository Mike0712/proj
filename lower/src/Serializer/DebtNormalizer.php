<?php

namespace App\Serializer;

use App\Entity\Currency;
use App\Requests\DebtRequest;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\Exception\NotNormalizableValueException;
use Symfony\Component\Serializer\Exception\UnexpectedValueException;
use Symfony\Component\Serializer\Normalizer\DenormalizerInterface;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;


class DebtNormalizer implements DenormalizerInterface
{
    public function __construct(private ObjectNormalizer $normalizer, private EntityManagerInterface $entityManager) {}

    public function denormalize(mixed $data, string $type, string $format = null, array $context = [])
    {
        $currency = null;
        if (!empty($data['currency'])) {
            $currency = $this->entityManager->getRepository(Currency::class)->findOneBy($data['currency']);
        }

        if (empty($currency)) {
            throw NotNormalizableValueException::createForUnexpectedDataType('Currency is empty', null, ['Currency'], 'Currency');
        }

        /**
         * @var $data DebtRequest
         */
        $data = $this->normalizer->denormalize($data, $type, $format, $context);
        $data->setCurrency($currency);

        return $data;
    }

    public function supportsDenormalization(mixed $data, string $type, string $format = null): bool
    {
        return $type == DebtRequest::class;
    }
}