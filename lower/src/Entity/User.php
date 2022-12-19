<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface, TimestampableInterface
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id;

    #[ORM\Column(type: 'string', length: 180, unique: true)]
    private string $email;

    #[ORM\Column(type: 'json')]
    private array $roles = [];

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $password;

    #[Assert\Length(min: 3, max: 128)]
    private ?string $plainPassword = null;

    #[ORM\OneToMany(mappedBy: 'owner', targetEntity: Address::class)]
    private Collection $addresses;

    #[ORM\OneToMany(mappedBy: 'account', targetEntity: DebtDocument::class)]
    private Collection $accountDebtDocuments;

    #[ORM\OneToMany(mappedBy: 'debtor', targetEntity: DebtDocument::class)]
    private Collection $debtorDebtDocuments;

    #[ORM\OneToMany(mappedBy: 'account', targetEntity: PaymentAccount::class)]
    private Collection $paymentAccounts;

    #[ORM\OneToMany(mappedBy: 'debtor', targetEntity: Transaction::class)]
    private Collection $transactions;

    #[ORM\OneToOne(mappedBy: 'owner', targetEntity: Profile::class, cascade: ['persist', 'remove'])]
    private ?Profile $profile;

    #[ORM\Column(type: 'boolean', nullable: true)]
    private ?bool $isActive;

    #[ORM\Column(type: 'string', length: 5, nullable: true)]
    private ?string $language;

    #[ORM\ManyToOne(targetEntity: self::class, inversedBy: 'accounts')]
    private $assistant;

    #[ORM\OneToMany(mappedBy: 'assistant', targetEntity: self::class)]
    private $accounts;

    public function __construct()
    {
        $this->addresses = new ArrayCollection();
        $this->accountDebtDocuments = new ArrayCollection();
        $this->debtorDebtDocuments = new ArrayCollection();
        $this->paymentAccounts = new ArrayCollection();
        $this->transactions = new ArrayCollection();
        $this->accounts = new ArrayCollection();
    }

    const ROLE_ACCOUNT = 'account';

    const ROLE_DEBTOR = 'debtor';

    const ROLE_ASSISTANT = 'assistant';

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(string $password): void
    {
        $this->plainPassword = $password;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        $this->plainPassword = null;
    }

    /**
     * @return Collection<int, Address>
     */
    public function getAddresses(): Collection
    {
        return $this->addresses;
    }

    public function addAddress(Address $address): self
    {
        if (!$this->addresses->contains($address)) {
            $this->addresses[] = $address;
            $address->setOwner($this);
        }

        return $this;
    }

    public function removeAddress(Address $address): self
    {
        if ($this->addresses->removeElement($address)) {
            // set the owning side to null (unless already changed)
            if ($address->getOwner() === $this) {
                $address->setOwner(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, DebtDocument>
     */
    public function getAccountDebtDocuments(): Collection
    {
        return $this->accountDebtDocuments;
    }

    public function addAccountDebtDocument(DebtDocument $accountDebtDocument): self
    {
        if (!$this->accountDebtDocuments->contains($accountDebtDocument)) {
            $this->accountDebtDocuments[] = $accountDebtDocument;
            $accountDebtDocument->setAccount($this);
        }

        return $this;
    }

    public function removeAccountDebtDocument(DebtDocument $accountDebtDocument): self
    {
        if ($this->accountDebtDocuments->removeElement($accountDebtDocument)) {
            // set the owning side to null (unless already changed)
            if ($accountDebtDocument->getAccount() === $this) {
                $accountDebtDocument->setAccount(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, DebtDocument>
     */
    public function getDebtorDebtDocuments(): Collection
    {
        return $this->debtorDebtDocuments;
    }

    public function addDebtorDebtDocument(DebtDocument $debtorDebtDocument): self
    {
        if (!$this->debtorDebtDocuments->contains($debtorDebtDocument)) {
            $this->debtorDebtDocuments[] = $debtorDebtDocument;
            $debtorDebtDocument->setDebtor($this);
        }

        return $this;
    }

    public function removeDebtorDebtDocument(DebtDocument $debtorDebtDocument): self
    {
        if ($this->debtorDebtDocuments->removeElement($debtorDebtDocument)) {
            // set the owning side to null (unless already changed)
            if ($debtorDebtDocument->getDebtor() === $this) {
                $debtorDebtDocument->setDebtor(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, PaymentAccount>
     */
    public function getPaymentAccounts(): Collection
    {
        return $this->paymentAccounts;
    }

    public function addPaymentAccount(PaymentAccount $paymentAccount): self
    {
        if (!$this->paymentAccounts->contains($paymentAccount)) {
            $this->paymentAccounts[] = $paymentAccount;
            $paymentAccount->setAccount($this);
        }

        return $this;
    }

    public function removePaymentAccount(PaymentAccount $paymentAccount): self
    {
        if ($this->paymentAccounts->removeElement($paymentAccount)) {
            // set the owning side to null (unless already changed)
            if ($paymentAccount->getAccount() === $this) {
                $paymentAccount->setAccount(null);
            }
        }

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
            $transaction->setDebtor($this);
        }

        return $this;
    }

    public function removeTransaction(Transaction $transaction): self
    {
        if ($this->transactions->removeElement($transaction)) {
            // set the owning side to null (unless already changed)
            if ($transaction->getDebtor() === $this) {
                $transaction->setDebtor(null);
            }
        }

        return $this;
    }

    public function getProfile(): ?Profile
    {
        return $this->profile;
    }

    public function setProfile(?Profile $profile): self
    {
        // unset the owning side of the relation if necessary
        if ($profile === null && $this->profile !== null) {
            $this->profile->setOwner(null);
        }

        // set the owning side of the relation if necessary
        if ($profile !== null && $profile->getOwner() !== $this) {
            $profile->setOwner($this);
        }

        $this->profile = $profile;

        return $this;
    }

    public function getIsActive(): ?bool
    {
        return $this->isActive;
    }

    public function setIsActive(?bool $isActive): self
    {
        $this->isActive = $isActive;

        return $this;
    }

    public function getLanguage(): ?string
    {
        return $this->language;
    }

    public function setLanguage(?string $language): self
    {
        $this->language = $language;

        return $this;
    }

    public function getAssistant(): ?self
    {
        return $this->assistant;
    }

    public function setAssistant(?self $assistant): self
    {
        $this->assistant = $assistant;

        return $this;
    }

    /**
     * @return Collection<int, self>
     */
    public function getAccounts(): Collection
    {
        return $this->accounts;
    }

    public function addAccount(self $account): self
    {
        if (!$this->accounts->contains($account)) {
            $this->accounts[] = $account;
            $account->setAssistant($this);
        }

        return $this;
    }

    public function removeAccount(self $account): self
    {
        if ($this->accounts->removeElement($account)) {
            // set the owning side to null (unless already changed)
            if ($account->getAssistant() === $this) {
                $account->setAssistant(null);
            }
        }

        return $this;
    }
}
