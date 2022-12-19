<?php

declare(strict_types=1);

namespace App\Behavior;

use Knp\DoctrineBehaviors\Model\Translatable\TranslationTrait as TranslationTraitMain;

trait TranslationTrait
{
    use TranslationTraitMain;

    public static function getTranslatableEntityClass(): string
    {
        $explodedNamespace = explode('\\', __CLASS__);
        $entityClass = array_pop($explodedNamespace);
        // Remove Translation namespace
        array_pop($explodedNamespace);

        return '\\' . implode('\\', $explodedNamespace) . '\\' . substr($entityClass, 0, -11);
    }
}