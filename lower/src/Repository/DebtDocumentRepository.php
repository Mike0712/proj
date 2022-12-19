<?php

namespace App\Repository;

use App\Entity\DebtDocument;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\AbstractQuery;
use Doctrine\ORM\Exception\ORMException;
use Doctrine\ORM\OptimisticLockException;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @extends ServiceEntityRepository<DebtDocument>
 *
 * @method DebtDocument|null find($id, $lockMode = null, $lockVersion = null)
 * @method DebtDocument|null findOneBy(array $criteria, array $orderBy = null)
 * @method DebtDocument[]    findAll()
 * @method DebtDocument[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DebtDocumentRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, DebtDocument::class);
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function add(DebtDocument $entity, bool $flush = false): void
    {
        $this->_em->persist($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    /**
     * @throws ORMException
     * @throws OptimisticLockException
     */
    public function remove(DebtDocument $entity, bool $flush = false): void
    {
        $this->_em->remove($entity);
        if ($flush) {
            $this->_em->flush();
        }
    }

    public function getListByAccountAndStatus(UserInterface $account, string $status)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.account = :account AND d.status = :status AND d.deletedAt IS NULL')
            ->setParameter('account', $account)
            ->setParameter('status', $status)
            ->orderBy('d.id', 'ASC')
            ->getQuery()
            ->getResult(AbstractQuery::HYDRATE_ARRAY)
        ;
    }

    public function findOneByIdAndAccount(string $id, UserInterface $account)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.id = :id AND d.account = :account')
            ->setParameter('id', $id)
            ->setParameter('account', $account)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function getListByAssistantAndStatus(UserInterface $assistant, string $status)
    {
        return $this->createQueryBuilder('d')
            ->join('d.account', 'a')
            ->andWhere('a.assistant = :assistant AND d.status = :status AND d.deletedAt IS NULL')
            ->setParameter('assistant', $assistant)
            ->setParameter('status', $status)
            ->orderBy('d.id', 'ASC')
            ->getQuery()
            ->getResult(AbstractQuery::HYDRATE_ARRAY)
            ;
    }

    public function findOneByIdAndAssistant(string $id, UserInterface $assistant)
    {
        return $this->createQueryBuilder('d')
            ->join('d.account', 'a')
            ->andWhere('d.id = :id AND a.assistant = :assistant AND d.deletedAt IS NULL')
            ->setParameter('id', $id)
            ->setParameter('assistant', $assistant)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

//    /**
//     * @return DebtDocument[] Returns an array of DebtDocument objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('d.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?DebtDocument
//    {
//        return $this->createQueryBuilder('d')
//            ->andWhere('d.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
