<?php

namespace App\Entity\Translation;

use App\Repository\Translation\CountryTranslationRepository;
use App\Behavior\TranslationTrait;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\TranslationInterface;

#[ORM\Entity(repositoryClass: CountryTranslationRepository::class)]
class CountryTranslation implements TranslationInterface
{
    use TranslationTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id;

    #[ORM\Column(type: 'string', length: 50, nullable: true)]
    private ?string $title;

    #[ORM\Column(type: 'string', length: 50, nullable: true)]
    private ?string $capital;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setIsoCode(string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getCapital(): ?string
    {
        return $this->capital;
    }

    public function setCapital(string $capital): self
    {
        $this->capital = $capital;

        return $this;
    }
}
