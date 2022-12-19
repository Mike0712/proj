<?php

namespace App\Controller\Api;

use App\Entity\DebtDocument;
use App\Entity\PreDebtor;
use App\Requests\BaseRequest;
use App\Requests\DebtRequest;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

#[Route('/api/account/debt', name: 'app_account_debt_')]
class AccountDebtController extends AbstractController
{
    public function __construct(private TranslatorInterface $translator, private EntityManagerInterface $entityManager) {}

    #[Route('/{id}', name: 'get', methods: ['GET'])]
    public function get(string $id): Response
    {
        try {
            $debtDocument = $this->findUserDeptDocument($id, true);
        } catch (\Exception $exception) {
            return $this->json(['message' => 'error', 'errors' => [
                ['message' => $exception->getMessage()]
            ]], 201);
        }

        return $this->json(['message' => 'ok', 'data' => $debtDocument]);
    }

    #[Route('/', name: 'post', methods: ['POST'])]
    public function post(BaseRequest $debtRequest): Response
    {
        try {
            /**
             * @var DebtDocument $debtDocument
             * @var PreDebtor $preDebtor
             * @var DebtRequest $debtRequest
             */
            $debtRequest = $debtRequest->validate(DebtRequest::class);
            list($debtDocument, $preDebtor) = $this->setRequestToModel($debtRequest, new DebtDocument(), new PreDebtor());
            $preDebtor->setDebtDocument($debtDocument);
            $debtDocument->setPreDebtor($preDebtor)->setAccount($this->getUser());
            $this->entityManager->persist($debtDocument);
            $this->entityManager->persist($preDebtor);
            $this->entityManager->flush();
        } catch (Exception $exception) {
            return $this->json(['message' => 'error', 'errors' => [
                ['message' => $this->translator->trans('Document not saved. Please contact administration.')]
            ]], 201);
        }

        return $this->json(['message' => 'ok']);
    }

    #[Route('/{id}', name: 'put', methods: ['PUT'])]
    public function put(string $id, BaseRequest $debtRequest): Response
    {
        /**
         * @var DebtDocument|null $debtDocument
         * @var PreDebtor $preDebtor
         * @var DebtRequest $debtRequest
         */
        try {
            $debtDocument = $this->findUserDeptDocument($id);
        } catch (\Exception $exception) {
            return $this->json(['message' => 'error', 'errors' => [
                ['message' => $exception->getMessage()]
            ]], 201);
        }

        $preDebtor = $debtDocument->getPreDebtor();
        $debtRequest = $debtRequest->validate(DebtRequest::class);
        list($debtDocument, $preDebtor) = $this->setRequestToModel($debtRequest, $debtDocument, $preDebtor);

        $this->entityManager->persist($debtDocument);
        $this->entityManager->persist($preDebtor);
        $this->entityManager->flush();

        return $this->json(['message' => 'ok']);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(string $id): Response
    {
        /**
         * @var DebtDocument|null $debtDocument
         */
        try {
            $debtDocument = $this->findUserDeptDocument($id);
        } catch (\Exception $exception) {
            return $this->json(['message' => 'error', 'errors' => [
                ['message' => $exception->getMessage()]
            ]], 201);
        }

        $this->entityManager->remove($debtDocument);
        $this->entityManager->flush();

        return $this->json(['message' => 'ok']);
    }

    private function findUserDeptDocument(string $id, bool $skipStatusCheck = false)
    {
        $debtDocument = $this->entityManager->getRepository(DebtDocument::class)
            ->findOneByIdAndAccount($id ,$this->getUser());

        if (empty($debtDocument)) {
            throw new \Exception($this->translator->trans('Document not found.'));
        }

        if ($skipStatusCheck && $debtDocument->getStatus() !== DebtDocument::STATUS_NEW) {
            throw new \Exception($this->translator->trans('Wrong status for delete.'));
        }

        return $debtDocument;
    }

    private function setRequestToModel(DebtRequest $request, DebtDocument $debtDocument, PreDebtor $preDebtor): array
    {
        $debtDocument->setDeadline($request->getDeadline())->setAmount($request->getAmount())
            ->setCurrency($request->getCurrency())->setDocName($request->getDocName());
        $preDebtor->setFirstName($request->getFirstName())->setLastName($request->getLastName())
            ->setAdditionalName($request->getAdditionalName())->setPhoneNumber($request->getPhoneNumber());

        return [$debtDocument, $preDebtor];
    }

}