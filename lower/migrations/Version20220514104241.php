<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220514104241 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE pre_debtor_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE pre_debtor (id INT NOT NULL, debt_document_id INT DEFAULT NULL, first_name VARCHAR(255) DEFAULT NULL, last_name VARCHAR(255) DEFAULT NULL, additional_name VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_DA0E1C3181DB200D ON pre_debtor (debt_document_id)');
        $this->addSql('ALTER TABLE pre_debtor ADD CONSTRAINT FK_DA0E1C3181DB200D FOREIGN KEY (debt_document_id) REFERENCES debt_document (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE debt_document ADD status VARCHAR(100) DEFAULT NULL');
        $this->addSql('ALTER TABLE debt_document ADD deleted_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE pre_debtor_id_seq CASCADE');
        $this->addSql('DROP TABLE pre_debtor');
        $this->addSql('ALTER TABLE debt_document DROP status');
        $this->addSql('ALTER TABLE debt_document DROP deleted_at');
    }
}
