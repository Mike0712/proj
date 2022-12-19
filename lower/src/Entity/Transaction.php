<?php

namespace App\Entity;

use App\Repository\TransactionRepository;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;

#[ORM\Entity(repositoryClass: TransactionRepository::class)]
class Transaction implements TimestampableInterface
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id;

    #[ORM\ManyToOne(targetEntity: PaymentAccount::class, inversedBy: 'transactions')]
    private ?PaymentAccount $paymentAccount;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2, nullable: true)]
    private ?float $amount;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'transactions')]
    private ?User $debtor;

    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $paymentDate;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPaymentAccount(): ?PaymentAccount
    {
        return $this->paymentAccount;
    }

    public function setPaymentAccount(?PaymentAccount $paymentAccount): self
    {
        $this->paymentAccount = $paymentAccount;

        return $this;
    }

    public function getAmount(): ?string
    {
        return $this->amount;
    }

    public function setAmount(?string $amount): self
    {
        $this->amount = $amount;

        return $this;
    }

    public function getDebtor(): ?User
    {
        return $this->debtor;
    }

    public function setDebtor(?User $debtor): self
    {
        $this->debtor = $debtor;

        return $this;
    }

    public function getPaymentDate(): ?\DateTimeInterface
    {
        return $this->paymentDate;
    }

    public function setPaymentDate(?\DateTimeInterface $paymentDate): self
    {
        $this->paymentDate = $paymentDate;

        return $this;
    }
}
