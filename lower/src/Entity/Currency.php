<?php

namespace App\Entity;

use App\Behavior\TranslatableTrait;
use App\Repository\CurrencyRepository;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\TranslatableInterface;

#[ORM\Entity(repositoryClass: CurrencyRepository::class)]
class Currency implements TranslatableInterface
{
    use TranslatableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $isoNum;

    #[ORM\Column(type: 'string', length: 10, nullable: true)]
    private ?string $isoCode;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $fractNum;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIsoNum(): ?int
    {
        return $this->isoNum;
    }

    public function setIsoNum(int $isoNum): self
    {
        $this->isoNum = $isoNum;

        return $this;
    }

    public function getIsoCode(): ?string
    {
        return $this->isoCode;
    }

    public function setIsoCode(string $isoCode): self
    {
        $this->isoCode = $isoCode;

        return $this;
    }

    public function getFractNum(): ?int
    {
        return $this->fractNum;
    }

    public function setFractNum(?int $fractNum): self
    {
        $this->fractNum = $fractNum;

        return $this;
    }

    public function __toString(): string
    {
        return (string)$this->getIsoCode();
    }
}
