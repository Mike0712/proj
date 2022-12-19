<?php

declare(strict_types=1);

namespace App\Behavior;

use Knp\DoctrineBehaviors\Model\Translatable\TranslatableTrait as TranslatableTraitMain;

trait TranslatableTrait
{
    use TranslatableTraitMain;

    public static function getTranslationEntityClass(): string
    {
        $explodedNamespace = explode('\\', __CLASS__);
        $entityClass = array_pop($explodedNamespace);

        return '\\' . implode('\\', $explodedNamespace) . '\\Translation\\' . $entityClass . 'Translation';
    }
}