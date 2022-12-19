<?php

namespace App\DataFixtures\Processor;

use App\Entity\User;
use Fidry\AliceDataFixtures\ProcessorInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserProcessor implements ProcessorInterface
{
    private UserPasswordHasherInterface $encoder;

    public function __construct(UserPasswordHasherInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function preProcess(string $id, object $object): void
    {
        if (false === $object instanceof User) {
            return;
        }

        if (!empty($object->getPlainPassword())) {
            $object->setPassword($this->encoder->hashPassword($object, $object->getPlainPassword()));
        }
    }

    public function postProcess(string $id, object $object): void
    {

    }
}