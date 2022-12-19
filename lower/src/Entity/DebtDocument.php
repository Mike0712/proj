<?php

namespace App\Entity;

use App\Repository\DebtDocumentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\SoftDeletableInterface;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\SoftDeletable\SoftDeletableTrait;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\Ignore;

#[ORM\Entity(repositoryClass: DebtDocumentRepository::class)]
class DebtDocument implements TimestampableInterface, SoftDeletableInterface
{
    use SoftDeletableTrait;
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['list'])]
    private ?int $id;

    #[Groups(['list'])]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $docName;

    #[Ignore]
    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $company;

    #[ORM\Column(type: 'date', nullable: true)]
    private ?\DateTimeInterface $docDate;

    #[Groups(['list'])]
    #[ORM\Column(type: 'float', length: 10, precision: 2, nullable: true)]
    private ?float $amount;

    #[Groups(['list'])]
    #[ORM\ManyToOne(targetEntity: Currency::class)]
    private ?Currency $currency;

    #[Ignore]
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'debtDocuments')]
    private ?User $account;

    #[Ignore]
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'debtDocuments')]
    private ?User $debtor;

    #[Ignore]
    #[ORM\Column(type: 'array', nullable: true)]
    private array $files = [];

    #[Groups(['list'])]
    #[ORM\Column(type: 'datetime', nullable: true)]
    private ?\DateTimeInterface $deadline;

    #[Ignore]
    #[ORM\OneToMany(mappedBy: 'debtDocument', targetEntity: Dispute::class)]
    private Collection $disputes;

    #[Ignore]
    #[ORM\Column(type: 'string', length: 100, nullable: true)]
    private ?string $status;

    #[Ignore]
    #[ORM\OneToOne(mappedBy: 'debtDocument', targetEntity: PreDebtor::class, cascade: ['persist', 'remove'])]
    private ?PreDebtor $preDebtor;

    #[Ignore]
    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $operatorText;

    const STATUS_NEW = 'new';

    const STATUS_IN_PROCESS = 'in process';

    const STATUS_ACTIVE = 'active';

    const STATUS_INACTIVE = 'inactive';

    const STATUS_CONFIRMED = 'confirmed';

    const STATUS_LIST = [
        self::STATUS_NEW,
        self::STATUS_IN_PROCESS,
        self::STATUS_ACTIVE,
        self::STATUS_INACTIVE,
        self::STATUS_CONFIRMED,
    ];

    public function __construct()
    {
        $this->status = self::STATUS_NEW;
        $this->disputes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDocName(): ?string
    {
        return $this->docName;
    }

    public function setDocName(?string $docName): self
    {
        $this->docName = $docName;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): self
    {
        $this->company = $company;

        return $this;
    }

    public function getDocDate(): ?\DateTimeInterface
    {
        return $this->docDate;
    }

    public function setDocDate(?\DateTimeInterface $docDate): self
    {
        $this->docDate = $docDate;

        return $this;
    }

    public function getAmount(): ?float
    {
        return $this->amount;
    }

    public function setAmount(?float $amount): self
    {
        $this->amount = $amount;

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

    public function getAccount(): ?User
    {
        return $this->account;
    }

    public function setAccount(?UserInterface $account): self
    {
        $this->account = $account;

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

    public function getFiles(): ?array
    {
        return $this->files;
    }

    public function setFiles(?array $files): self
    {
        $this->files = $files;

        return $this;
    }

    public function getDeadline(): ?\DateTimeInterface
    {
        return $this->deadline;
    }

    public function setDeadline(?\DateTimeInterface $deadline): self
    {
        $this->deadline = $deadline;

        return $this;
    }

    /**
     * @return Collection<int, Dispute>
     */
    public function getDisputes(): Collection
    {
        return $this->disputes;
    }

    public function addDispute(Dispute $dispute): self
    {
        if (!$this->disputes->contains($dispute)) {
            $this->disputes[] = $dispute;
            $dispute->setDebtDocument($this);
        }

        return $this;
    }

    public function removeDispute(Dispute $dispute): self
    {
        if ($this->disputes->removeElement($dispute)) {
            // set the owning side to null (unless already changed)
            if ($dispute->getDebtDocument() === $this) {
                $dispute->setDebtDocument(null);
            }
        }

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getPreDebtor(): ?PreDebtor
    {
        return $this->preDebtor;
    }

    public function setPreDebtor(?PreDebtor $preDebtor): self
    {
        // unset the owning side of the relation if necessary
        if ($preDebtor === null && $this->preDebtor !== null) {
            $this->preDebtor->setDebtDocument(null);
        }

        // set the owning side of the relation if necessary
        if ($preDebtor !== null && $preDebtor->getDebtDocument() !== $this) {
            $preDebtor->setDebtDocument($this);
        }

        $this->preDebtor = $preDebtor;

        return $this;
    }

    public function getOperatorText(): ?string
    {
        return $this->operatorText;
    }

    public function setOperatorText(?string $operatorText): self
    {
        $this->operatorText = $operatorText;

        return $this;
    }
}
