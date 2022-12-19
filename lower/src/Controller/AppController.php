<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    #[Route(path: '/{reactRouting}', name: 'app_index', defaults: ["reactRouting" => null], requirements: ["reactRouting" => ".+"], methods: ['GET'])]
    public function index(?string $reactRouting): Response
    {
        if (!$this->getUser()) {
            return $this->redirectToRoute('app_login');
        }

        return $this->render('app.html.twig', [
            'reactRouting' => $reactRouting
        ]);
    }
}