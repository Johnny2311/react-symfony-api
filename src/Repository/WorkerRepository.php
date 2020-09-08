<?php

namespace App\Repository;

use App\Entity\Worker;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Worker|null find($id, $lockMode = null, $lockVersion = null)
 * @method Worker|null findOneBy(array $criteria, array $orderBy = null)
 * @method Worker[]    findAll()
 * @method Worker[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class WorkerRepository extends ServiceEntityRepository
{
    private $manager;
    public function __construct(ManagerRegistry $registry, EntityManagerInterface $manager)
    {
        parent::__construct($registry, Worker::class);
        $this->manager = $manager;
    }

    public function saveWorker($name, $birthdate, $address, $phone, $email, $dniNumber, $deparment)
    {
        $newWorker = new Worker();

        $newWorker
            ->setName($name)
            ->setBirthdate($birthdate)
            ->setAddress($address)
            ->setPhone($phone)
            ->setEmail($email)
            ->setDniNumber($dniNumber)
            ->setDeparment($deparment);

        $this->manager->persist($newWorker);
        $this->manager->flush();

    }

    public function updateWorker(Worker $worker): Worker
    {
        $this->manager->persist($worker);
        $this->manager->flush();

        return $worker;
    }


    public function removeWorker(Worker $worker)
    {
        $this->manager->remove($worker);
        $this->manager->flush();
    }

    // /**
    //  * @return Worker[] Returns an array of Worker objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('w.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Worker
    {
        return $this->createQueryBuilder('w')
            ->andWhere('w.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
