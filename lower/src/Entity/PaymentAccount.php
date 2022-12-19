<?php

namespace App\Entity;

use App\Repository\PaymentAccountRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;

#[ORM\Entity(repositoryClass: PaymentAccountRepository::class)]
class PaymentAccount implements TimestampableInterface
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'paymentAccounts')]
    private ?User $account;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $recipient;

    #[ORM\Column(type: 'string', length: 20, nullable: true)]
    private ?string $accountNumber;

    #[ORM\ManyToOne(targetEntity: Currency::class)]
    private ?Currency $currency;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $bankName;

    #[ORM\Column(type: 'string', length: 10, nullable: true)]
    private ?string $bik;

    #[ORM\Column(type: 'string', length: 20, nullable: true)]
    private ?string $ca;

    #[ORM\Column(type: 'string', length: 15, nullable: true)]
    private ?string $inn;

    #[ORM\Column(type: 'string', length: 10, nullable: true)]
    private ?string $kpp;

    #[ORM\OneToMany(mappedBy: 'paymentAccount', targetEntity: Transaction::class)]
    private Collection $transactions;

    public function __construct()
    {
        $this->transactions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAccount(): ?User
    {
        return $this->account;
    }

    public function setAccount(?User $account): self
    {
        $this->account = $account;

        return $this;
    }

    public function getRecipient(): ?string
    {
        return $this->recipient;
    }

    public function setRecipient(?string $recipient): self
    {
        $this->recipient = $recipient;

        return $this;
    }

    public function getAccountNumber(): ?string
    {
        return $this->accountNumber;
    }

    public function setAccountNumber(?string $accountNumber): self
    {
        $this->accountNumber = $accountNumber;

        return $this;
    }

    public function getCurrency(): ?Currency
    {
        return $this->currency;
    }

    public function setCurrency(?Currency $currency): self
    {
        $this->currency = $currency;

        return $this;
    }

    public function getBankName(): ?string
    {
        return $this->bankName;
    }

    public function setBankName(?string $bankName): self
    {
        $this->bankName = $bankName;

        return $this;
    }

    public function getBik(): ?string
    {
        return $this->bik;
    }

    public function setBik(?string $bik): self
    {
        $this->bik = $bik;

        return $this;
    }

    public function getCa(): ?string
    {
        return $this->ca;
    }

    public function setCa(?string $ca): self
    {
        $this->ca = $ca;

        return $this;
    }

    public function getInn(): ?string
    {
        return $this->inn;
    }

    public function setInn(?string $inn): self
    {
        $this->inn = $inn;

        return $this;
    }

    public function getKpp(): ?string
    {
        return $this->kpp;
    }

    public function setKpp(?string $kpp): self
    {
        $this->kpp = $kpp;

        return $this;
    }

    /**
     * @return Collection<int, Transaction>
     */
    public function getTransactions(): Collection
    {
        return $this->transactions;
    }

    public function addTransaction(Transaction $transaction): self
    {
        if (!$this->transactions->contains($transaction)) {
            $this->transactions[] = $transaction;
            $transaction->setPaymentAccount($this);
        }

        return $this;
    }

    public function removeTransaction(Transaction $transaction): self
    {
        if ($this->transactions->removeElement($transaction)) {
            // set the owning side to null (unless already changed)
            if ($transaction->getPaymentAccount() === $this) {
                $transaction->setPaymentAccount(null);
            }
        }

        return $this;
    }
}
