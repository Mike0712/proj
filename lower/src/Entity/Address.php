<?php

namespace App\Entity;

use App\Repository\AddressRepository;
use Doctrine\ORM\Mapping as ORM;
use Knp\DoctrineBehaviors\Contract\Entity\TimestampableInterface;
use Knp\DoctrineBehaviors\Model\Timestampable\TimestampableTrait;

#[ORM\Entity(repositoryClass: AddressRepository::class)]
class Address implements TimestampableInterface
{
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private ?int $id;

    #[ORM\ManyToOne(targetEntity: Country::class)]
    private ?Country $country;

    #[ORM\ManyToOne(targetEntity: City::class)]
    private ?City $city;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $region;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $area;

    #[ORM\Column(type: 'string', length: 10, nullable: true)]
    private ?string $postalCode;

    #[ORM\Column(type: 'string', length: 10, nullable: true)]
    private ?string $home;

    #[ORM\Column(type: 'string', length: 20, nullable: true)]
    private ?string $building;

    #[ORM\Column(type: 'string', length: 10, nullable: true)]
    private ?string $apartment;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'addresses')]
    private ?User $owner;

    #[ORM\Column(type: 'text', nullable: true)]
    private ?string $moreData;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCountry(): ?Country
    {
        return $this->country;
    }

    public function setCountry(?Country $country): self
    {
        $this->country = $country;

        return $this;
    }

    public function getCity(): ?City
    {
        return $this->city;
    }

    public function setCity(?City $city): self
    {
        $this->city = $city;

        return $this;
    }

    public function getRegion(): ?string
    {
        return $this->region;
    }

    public function setRegion(?string $region): self
    {
        $this->region = $region;

        return $this;
    }

    public function getArea(): ?string
    {
        return $this->area;
    }

    public function setArea(?string $area): self
    {
        $this->area = $area;

        return $this;
    }

    public function getPostalCode(): ?string
    {
        return $this->postalCode;
    }

    public function setPostalCode(?string $postalCode): self
    {
        $this->postalCode = $postalCode;

        return $this;
    }

    public function getHome(): ?string
    {
        return $this->home;
    }

    public function setHome(?string $home): self
    {
        $this->home = $home;

        return $this;
    }

    public function getBuilding(): ?string
    {
        return $this->building;
    }

    public function setBuilding(?string $building): self
    {
        $this->building = $building;

        return $this;
    }

    public function getApartment(): ?string
    {
        return $this->apartment;
    }

    public function setApartment(?string $apartment): self
    {
        $this->apartment = $apartment;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): self
    {
        $this->owner = $owner;

        return $this;
    }

    public function getMoreData(): ?string
    {
        return $this->moreData;
    }

    public function setMoreData(?string $moreData): self
    {
        $this->moreData = $moreData;

        return $this;
    }
}
