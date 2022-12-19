<?php

namespace App\Requests\Types;

use App\Serializer\DebtNormalizer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PropertyInfo\Extractor\ReflectionExtractor;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;

class Standard
{
    public function denormalize(array $params, string $class, EntityManagerInterface $entityManager)
    {
        $normalizer = new ObjectNormalizer(
            null,
            null,
            null,
            new ReflectionExtractor()
        );
        $serializer = new Serializer([
            new DateTimeNormalizer(),
            new DebtNormalizer($normalizer, $entityManager),
            $normalizer
        ]); // array of needed normalizer
        return $serializer->denormalize(
            $params,
            $class
        );
    }
}