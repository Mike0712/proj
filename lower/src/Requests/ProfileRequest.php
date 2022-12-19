<?php

namespace App\Requests;

use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\Type;

class ProfileRequest extends BaseRequest
{
    #[NotBlank]
    #[Length(min: 3, max: 200)]
    protected ?string $firstName;

    #[NotBlank]
    #[Length(min: 3, max: 200)]
    protected ?string $lastName;

    #[Length(min: 3, max: 200)]
    protected ?string $additionalName;

    #[Length(min: 5, max: 200)]
    protected ?string $phoneNumber;
}