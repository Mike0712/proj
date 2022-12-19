<?php

namespace App\Controller\Api;

use App\Entity\DebtDocument;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

#[Route('/api/assistant/debt', name: 'app_assistant_debt_')]
class AssistantDeptController extends AbstractController
{
    public function __construct(private TranslatorInterface $translator, private EntityManagerInterface $entityManager) {}

    #[Route('/{id}', name: 'get', methods: ['GET'])]
    public function get(string $id): Response
    {
        /**
         * @var $debtDocument DebtDocument
         */
        try {
            $debtDocument = $this->findUserDeptDocument($id);
            $debtDocument->setStatus(DebtDocument::STATUS_IN_PROCESS);
        } catch (\Exception $exception) {
            return $this->json(['message' => 'error', 'errors' => [
                ['message' => $exception->getMessage()]
            ]], 201);
        }

        return $this->json(['message' => 'ok', 'data' => $debtDocument]);
    }

    private function findUserDeptDocument(string $id)
    {
        $debtDocument = $this->entityManager->getRepository(DebtDocument::class)
            ->findOneByIdAndAssistant($id ,$this->getUser());

        if (empty($debtDocument)) {
            throw new \Exception($this->translator->trans('Document not found.'));
        }

        return $debtDocument;
    }

}