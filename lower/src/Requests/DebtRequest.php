<?php

namespace App\Requests;

use App\Entity\Currency;
use Symfony\Component\Validator\Constraints\Date;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\NotNull;
use Symfony\Component\Validator\Constraints\Positive;
use Symfony\Component\Validator\Constraints\Type;

class DebtRequest
{
    #[NotBlank]
    #[Length(min: 3, max: 200)]
    protected string $firstName;

    #[NotBlank]
    #[Length(min: 3, max: 200)]
    protected string $lastName;

    #[NotBlank]
    #[Length(min: 3, max: 200)]
    protected string $additionalName;

    #[NotBlank]
    #[Length(min: 3, max: 255)]
    protected string $docName;

    #[NotBlank]
    #[Positive]
    protected float $amount;

    #[NotBlank]
    #[Length(min: 5, max: 50)]
    protected float $phoneNumber;

    #[NotBlank]
    #[Type("\DateTimeInterface")]
    protected \DateTimeInterface $deadline;

    #[NotBlank]
    #[NotNull]
    private Currency $currency;

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function getAdditionalName(): string
    {
        return $this->additionalName;
    }

    public function getDocName(): string
    {
        return $this->docName;
    }

    public function getAmount(): float
    {
        return $this->amount;
    }
    public function getDeadline(): \DateTimeInterface
    {
        return $this->deadline;
    }

    public function getPhoneNumber(): string
    {
        return $this->phoneNumber;
    }

    public function setFirstName(string $firstName): void
    {
        $this->firstName = $firstName;
    }

    public function setLastName(string $lastName): void
    {
        $this->lastName = $lastName;
    }

    public function setAdditionalName(string $additionalName): void
    {
        $this->additionalName = $additionalName;
    }

    public function setDocName(string $docName): void
    {
        $this->docName = $docName;
    }

    public function setAmount(float $amount): void
    {
        $this->amount = $amount;
    }

    public function setPhoneNumber(string $phoneNumber): void
    {
        $this->phoneNumber = $phoneNumber;
    }

    public function setDeadline(\DateTimeInterface $deadline): void
    {
        $this->deadline = $deadline;
    }

    public function getCurrency(): Currency
    {
        return $this->currency;
    }

    public function setCurrency(Currency $currency): void
    {
        $this->currency = $currency;
    }
}