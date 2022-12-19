<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220508223333 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE address_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE city_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE city_translation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE country_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE country_translation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE currency_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE currency_translation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE debt_document_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE dispute_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE dispute_status_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE dispute_status_translation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE payment_account_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE transaction_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE address (id INT NOT NULL, country_id INT DEFAULT NULL, city_id INT DEFAULT NULL, owner_id INT DEFAULT NULL, region VARCHAR(255) DEFAULT NULL, area VARCHAR(255) DEFAULT NULL, postal_code VARCHAR(10) DEFAULT NULL, home VARCHAR(10) DEFAULT NULL, building VARCHAR(20) DEFAULT NULL, apartment VARCHAR(10) DEFAULT NULL, more_data TEXT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D4E6F81F92F3E70 ON address (country_id)');
        $this->addSql('CREATE INDEX IDX_D4E6F818BAC62AF ON address (city_id)');
        $this->addSql('CREATE INDEX IDX_D4E6F817E3C61F9 ON address (owner_id)');
        $this->addSql('CREATE TABLE city (id INT NOT NULL, country_id INT NOT NULL, code VARCHAR(10) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_2D5B0234F92F3E70 ON city (country_id)');
        $this->addSql('CREATE TABLE city_translation (id INT NOT NULL, translatable_id INT DEFAULT NULL, title VARCHAR(50) DEFAULT NULL, locale VARCHAR(5) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_97DD5B602C2AC5D3 ON city_translation (translatable_id)');
        $this->addSql('CREATE UNIQUE INDEX city_translation_unique_translation ON city_translation (translatable_id, locale)');
        $this->addSql('CREATE TABLE country (id INT NOT NULL, currency_id INT DEFAULT NULL, iso_code VARCHAR(255) DEFAULT NULL, locale VARCHAR(2) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5373C96638248176 ON country (currency_id)');
        $this->addSql('CREATE TABLE country_translation (id INT NOT NULL, translatable_id INT DEFAULT NULL, title VARCHAR(50) DEFAULT NULL, capital VARCHAR(50) DEFAULT NULL, locale VARCHAR(5) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_A1FE6FA42C2AC5D3 ON country_translation (translatable_id)');
        $this->addSql('CREATE UNIQUE INDEX country_translation_unique_translation ON country_translation (translatable_id, locale)');
        $this->addSql('CREATE TABLE currency (id INT NOT NULL, iso_num INT DEFAULT NULL, iso_code VARCHAR(10) DEFAULT NULL, fract_num INT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE currency_translation (id INT NOT NULL, translatable_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, locale VARCHAR(5) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5814BCE2C2AC5D3 ON currency_translation (translatable_id)');
        $this->addSql('CREATE UNIQUE INDEX currency_translation_unique_translation ON currency_translation (translatable_id, locale)');
        $this->addSql('CREATE TABLE debt_document (id INT NOT NULL, currency_id INT DEFAULT NULL, account_id INT DEFAULT NULL, debtor_id INT DEFAULT NULL, doc_name VARCHAR(255) DEFAULT NULL, company VARCHAR(255) DEFAULT NULL, doc_date DATE DEFAULT NULL, amount DOUBLE PRECISION DEFAULT NULL, files TEXT DEFAULT NULL, deadline TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_96753CF138248176 ON debt_document (currency_id)');
        $this->addSql('CREATE INDEX IDX_96753CF19B6B5FBA ON debt_document (account_id)');
        $this->addSql('CREATE INDEX IDX_96753CF1B043EC6B ON debt_document (debtor_id)');
        $this->addSql('COMMENT ON COLUMN debt_document.files IS \'(DC2Type:array)\'');
        $this->addSql('CREATE TABLE dispute (id INT NOT NULL, debt_document_id INT DEFAULT NULL, status_id INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_3C92500781DB200D ON dispute (debt_document_id)');
        $this->addSql('CREATE INDEX IDX_3C9250076BF700BD ON dispute (status_id)');
        $this->addSql('CREATE TABLE dispute_status (id INT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE dispute_status_translation (id INT NOT NULL, translatable_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, description TEXT DEFAULT NULL, locale VARCHAR(5) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E1BE841A2C2AC5D3 ON dispute_status_translation (translatable_id)');
        $this->addSql('CREATE UNIQUE INDEX dispute_status_translation_unique_translation ON dispute_status_translation (translatable_id, locale)');
        $this->addSql('CREATE TABLE payment_account (id INT NOT NULL, account_id INT DEFAULT NULL, currency_id INT DEFAULT NULL, recipient VARCHAR(255) DEFAULT NULL, account_number VARCHAR(20) DEFAULT NULL, bank_name VARCHAR(255) DEFAULT NULL, bik VARCHAR(10) DEFAULT NULL, ca VARCHAR(20) DEFAULT NULL, inn VARCHAR(15) DEFAULT NULL, kpp VARCHAR(10) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_647F584E9B6B5FBA ON payment_account (account_id)');
        $this->addSql('CREATE INDEX IDX_647F584E38248176 ON payment_account (currency_id)');
        $this->addSql('CREATE TABLE transaction (id INT NOT NULL, payment_account_id INT DEFAULT NULL, debtor_id INT DEFAULT NULL, amount NUMERIC(10, 2) DEFAULT NULL, payment_date TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_723705D1AE9DDE6F ON transaction (payment_account_id)');
        $this->addSql('CREATE INDEX IDX_723705D1B043EC6B ON transaction (debtor_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) DEFAULT NULL, first_name VARCHAR(255) DEFAULT NULL, last_name VARCHAR(255) DEFAULT NULL, phone VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('ALTER TABLE address ADD CONSTRAINT FK_D4E6F81F92F3E70 FOREIGN KEY (country_id) REFERENCES country (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE address ADD CONSTRAINT FK_D4E6F818BAC62AF FOREIGN KEY (city_id) REFERENCES city (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE address ADD CONSTRAINT FK_D4E6F817E3C61F9 FOREIGN KEY (owner_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE city ADD CONSTRAINT FK_2D5B0234F92F3E70 FOREIGN KEY (country_id) REFERENCES country (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE city_translation ADD CONSTRAINT FK_97DD5B602C2AC5D3 FOREIGN KEY (translatable_id) REFERENCES city (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE country ADD CONSTRAINT FK_5373C96638248176 FOREIGN KEY (currency_id) REFERENCES currency (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE country_translation ADD CONSTRAINT FK_A1FE6FA42C2AC5D3 FOREIGN KEY (translatable_id) REFERENCES country (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE currency_translation ADD CONSTRAINT FK_5814BCE2C2AC5D3 FOREIGN KEY (translatable_id) REFERENCES currency (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE debt_document ADD CONSTRAINT FK_96753CF138248176 FOREIGN KEY (currency_id) REFERENCES currency (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE debt_document ADD CONSTRAINT FK_96753CF19B6B5FBA FOREIGN KEY (account_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE debt_document ADD CONSTRAINT FK_96753CF1B043EC6B FOREIGN KEY (debtor_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE dispute ADD CONSTRAINT FK_3C92500781DB200D FOREIGN KEY (debt_document_id) REFERENCES debt_document (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE dispute ADD CONSTRAINT FK_3C9250076BF700BD FOREIGN KEY (status_id) REFERENCES dispute_status (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE dispute_status_translation ADD CONSTRAINT FK_E1BE841A2C2AC5D3 FOREIGN KEY (translatable_id) REFERENCES dispute_status (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE payment_account ADD CONSTRAINT FK_647F584E9B6B5FBA FOREIGN KEY (account_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE payment_account ADD CONSTRAINT FK_647F584E38248176 FOREIGN KEY (currency_id) REFERENCES currency (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1AE9DDE6F FOREIGN KEY (payment_account_id) REFERENCES payment_account (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE transaction ADD CONSTRAINT FK_723705D1B043EC6B FOREIGN KEY (debtor_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE address DROP CONSTRAINT FK_D4E6F818BAC62AF');
        $this->addSql('ALTER TABLE city_translation DROP CONSTRAINT FK_97DD5B602C2AC5D3');
        $this->addSql('ALTER TABLE address DROP CONSTRAINT FK_D4E6F81F92F3E70');
        $this->addSql('ALTER TABLE city DROP CONSTRAINT FK_2D5B0234F92F3E70');
        $this->addSql('ALTER TABLE country_translation DROP CONSTRAINT FK_A1FE6FA42C2AC5D3');
        $this->addSql('ALTER TABLE country DROP CONSTRAINT FK_5373C96638248176');
        $this->addSql('ALTER TABLE currency_translation DROP CONSTRAINT FK_5814BCE2C2AC5D3');
        $this->addSql('ALTER TABLE debt_document DROP CONSTRAINT FK_96753CF138248176');
        $this->addSql('ALTER TABLE payment_account DROP CONSTRAINT FK_647F584E38248176');
        $this->addSql('ALTER TABLE dispute DROP CONSTRAINT FK_3C92500781DB200D');
        $this->addSql('ALTER TABLE dispute DROP CONSTRAINT FK_3C9250076BF700BD');
        $this->addSql('ALTER TABLE dispute_status_translation DROP CONSTRAINT FK_E1BE841A2C2AC5D3');
        $this->addSql('ALTER TABLE transaction DROP CONSTRAINT FK_723705D1AE9DDE6F');
        $this->addSql('ALTER TABLE address DROP CONSTRAINT FK_D4E6F817E3C61F9');
        $this->addSql('ALTER TABLE debt_document DROP CONSTRAINT FK_96753CF19B6B5FBA');
        $this->addSql('ALTER TABLE debt_document DROP CONSTRAINT FK_96753CF1B043EC6B');
        $this->addSql('ALTER TABLE payment_account DROP CONSTRAINT FK_647F584E9B6B5FBA');
        $this->addSql('ALTER TABLE transaction DROP CONSTRAINT FK_723705D1B043EC6B');
        $this->addSql('DROP SEQUENCE address_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE city_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE city_translation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE country_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE country_translation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE currency_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE currency_translation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE debt_document_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE dispute_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE dispute_status_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE dispute_status_translation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE payment_account_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE transaction_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('DROP TABLE address');
        $this->addSql('DROP TABLE city');
        $this->addSql('DROP TABLE city_translation');
        $this->addSql('DROP TABLE country');
        $this->addSql('DROP TABLE country_translation');
        $this->addSql('DROP TABLE currency');
        $this->addSql('DROP TABLE currency_translation');
        $this->addSql('DROP TABLE debt_document');
        $this->addSql('DROP TABLE dispute');
        $this->addSql('DROP TABLE dispute_status');
        $this->addSql('DROP TABLE dispute_status_translation');
        $this->addSql('DROP TABLE payment_account');
        $this->addSql('DROP TABLE transaction');
        $this->addSql('DROP TABLE "user"');
    }
}
