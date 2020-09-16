<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

/**
 * @ORM\Entity(repositoryClass=WorkerRepository::class)
 * @Vich\Uploadable
 */
class Worker
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $name;


    /**
     * NOTE: This is not a mapped field of entity metadata, just a simple property.
     * 
     * @Vich\UploadableField(mapping="worker_photo", fileNameProperty="photoName", size="photoSize")
     */
    private $photoFile;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private $photoName;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $photoSize;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @ORM\Column(type="date")
     */
    private $birthdate;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $address;

    /**
     * @ORM\Column(type="string", length=100, nullable=true)
     */
    private $phone;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=50, unique=true)
     */
    private $dniNumber;

    /**
     * @ORM\Column(type="string", length=100)
     */
    private $deparment;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function setPhotoFile(?File $photoFile = null): self
    {
        $this->photoFile = $photoFile;

        if (null !== $photoFile) {
            // It is required that at least one field changes if you are using doctrine
            // otherwise the event listeners won't be called and the file is lost
            $this->updatedAt = new \DateTimeImmutable();
        }

        return $this;
    }

    public function getPhotoFile(): ?File
    {
        return $this->photoFile;
    }

    public function setPhotoName(?string $photoName): self
    {
        $this->photoName = $photoName;

        return $this;
    }

    public function getPhotoName(): ?string
    {
        return $this->photoName;
    }
    
    public function setPhotoSize(?int $photoSize): self
    {
        $this->photoSize = $photoSize;

        return $this;
    }

    public function getPhotoSize(): ?int
    {
        return $this->photoSize;
    }

    public function getBirthdate(): ?\DateTimeInterface
    {
        return $this->birthdate;
    }

    public function setBirthdate(\DateTimeInterface $birthdate): self
    {
        $this->birthdate = $birthdate;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;

        return $this;
    }

    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): self
    {
        $this->phone = $phone;

        return $this;
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

    public function getDniNumber(): ?string
    {
        return $this->dniNumber;
    }

    public function setDniNumber(string $dniNumber): self
    {
        $this->dniNumber = $dniNumber;

        return $this;
    }

    public function getDeparment(): ?string
    {
        return $this->deparment;
    }

    public function setDeparment(string $deparment): self
    {
        $this->deparment = $deparment;

        return $this;
    }

    public function toArray() 
    {
        return [
            'id'=> $this->getId(),
            'name' => $this->getName(),
            'birthdate' => $this->getBirthdate()->format('d/m/Y'),
            'address' => $this->getAddress(),
            'phone' => $this->getPhone(),
            'email' => $this->getEmail(),
            'dniNumber' => $this->getDniNumber(),
            'deparment' => $this->getDeparment()
        ];
    }
}
