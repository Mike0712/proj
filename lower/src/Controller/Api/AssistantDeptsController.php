<?php

namespace App\Controller\Api;

use App\Entity\DebtDocument;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/assistant/debts', name: 'app_assistant_debts_')]
class AssistantDeptsController extends AbstractController
{
    #[Route('/', name: 'get', methods: ['GET'])]
    public function get(EntityManagerInterface $entityManager, Request $request): Response
    {
        /**
         * @var array $depts
         */
        $status = DebtDocument::STATUS_CONFIRMED;
        if (!empty($request->get('status')) && in_array($request->get('status'), DebtDocument::STATUS_LIST)) {
            $status = $request->get('status');
        }
        $user = $this->getUser();
        $depts = $entityManager->getRepository(DebtDocument::class)
            ->getListByAssistantAndStatus($user, $status);

        return $this->json(['message' => 'ok', 'data' => $depts]);
    }
}