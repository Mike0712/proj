<?php

namespace App\Entity;

use App\Repository\DisputeRepository;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;

#[ORM\Entity(repositoryClass: DisputeRepository::class)]
class Dispute implements TimestampableInterface
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id;

    #[ORM\ManyToOne(targetEntity: DebtDocument::class, inversedBy: 'disputes')]
    private ?DebtDocument $debtDocument;

    #[ORM\ManyToOne(targetEntity: DisputeStatus::class)]
    private ?DisputeStatus $status;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDebtDocument(): ?DebtDocument
    {
        return $this->debtDocument;
    }

    public function setDebtDocument(?DebtDocument $debtDocument): self
    {
        $this->debtDocument = $debtDocument;

        return $this;
    }

    public function getStatus(): ?DisputeStatus
    {
        return $this->status;
    }

    public function setStatus(?DisputeStatus $status): self
    {
        $this->status = $status;

        return $this;
    }
}
