-- MySQL Workbench Synchronization
-- Generated: 2023-04-18 04:59
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: victo

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `mydb`.`login` (
  `idLogin` INT(11) NOT NULL,
  `idLinkedIn` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idLogin`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `idusuario` INT(11) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `sobrenome` VARCHAR(45) NULL DEFAULT NULL,
  `cpf` VARCHAR(45) NOT NULL,
  `foto` VARCHAR(45) NULL DEFAULT NULL,
  `tipoConta` VARCHAR(45) NULL DEFAULT NULL,
  `login_idLogin` INT(11) NOT NULL,
  `curriculo_idcurriculo` INT(11) NOT NULL,
  `empresa_idusuario` INT(11) NOT NULL,
  PRIMARY KEY (`idusuario`),
  INDEX `fk_candidato_login1_idx` (`login_idLogin` ASC) VISIBLE,
  INDEX `fk_usuario_curriculo1_idx` (`curriculo_idcurriculo` ASC) VISIBLE,
  INDEX `fk_usuario_empresa1_idx` (`empresa_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_candidato_login1`
    FOREIGN KEY (`login_idLogin`)
    REFERENCES `mydb`.`login` (`idLogin`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_curriculo1`
    FOREIGN KEY (`curriculo_idcurriculo`)
    REFERENCES `mydb`.`curriculo` (`idcurriculo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_empresa1`
    FOREIGN KEY (`empresa_idusuario`)
    REFERENCES `mydb`.`empresa` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`endereco` (
  `idendereco` INT(11) NOT NULL,
  `tipo` VARCHAR(45) NULL DEFAULT NULL,
  `logradouro` VARCHAR(45) NULL DEFAULT NULL,
  `cep` VARCHAR(45) NOT NULL,
  `bairro` VARCHAR(45) NULL DEFAULT NULL,
  `estado` VARCHAR(45) NULL DEFAULT NULL,
  `pais` VARCHAR(45) NULL DEFAULT NULL,
  `usuario_idusuario` INT(11) NOT NULL,
  `empresa_idusuario` INT(11) NOT NULL,
  PRIMARY KEY (`idendereco`),
  INDEX `fk_endereco_usuario1_idx` (`usuario_idusuario` ASC) VISIBLE,
  INDEX `fk_endereco_empresa1_idx` (`empresa_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_endereco_usuario1`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `mydb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_endereco_empresa1`
    FOREIGN KEY (`empresa_idusuario`)
    REFERENCES `mydb`.`empresa` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`telefone` (
  `idcontato` INT(11) NOT NULL,
  `tipo` VARCHAR(45) NULL DEFAULT NULL,
  `ddd` VARCHAR(45) NULL DEFAULT NULL,
  `numero` VARCHAR(45) NULL DEFAULT NULL,
  `usuario_idusuario` INT(11) NOT NULL,
  `empresa_idusuario` INT(11) NOT NULL,
  PRIMARY KEY (`idcontato`),
  INDEX `fk_telefone_usuario1_idx` (`usuario_idusuario` ASC) VISIBLE,
  INDEX `fk_telefone_empresa1_idx` (`empresa_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_telefone_usuario1`
    FOREIGN KEY (`usuario_idusuario`)
    REFERENCES `mydb`.`usuario` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_telefone_empresa1`
    FOREIGN KEY (`empresa_idusuario`)
    REFERENCES `mydb`.`empresa` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`empresa` (
  `idusuario` INT(11) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `razaoSocial` VARCHAR(45) NULL DEFAULT NULL,
  `cnpj` VARCHAR(45) NOT NULL,
  `vaga_idvaga` INT(11) NOT NULL,
  PRIMARY KEY (`idusuario`),
  INDEX `fk_empresa_vaga1_idx` (`vaga_idvaga` ASC) VISIBLE,
  CONSTRAINT `fk_empresa_vaga1`
    FOREIGN KEY (`vaga_idvaga`)
    REFERENCES `mydb`.`vaga` (`idvaga`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`vaga` (
  `idvaga` INT(11) NOT NULL,
  `cbo` VARCHAR(45) NOT NULL,
  `cargo` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(45) NULL DEFAULT NULL,
  `tipoContratacao` VARCHAR(45) NOT NULL,
  `tipoVaga` VARCHAR(45) NOT NULL,
  `salario` VARCHAR(45) NOT NULL,
  `beneficios` VARCHAR(45) NULL DEFAULT NULL,
  `tecnologiaPrincipal` VARCHAR(45) NOT NULL,
  `tecnologiaDesejados` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idvaga`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `mydb`.`curriculo` (
  `idcurriculo` INT(11) NOT NULL,
  `pdf` BLOB NOT NULL,
  `tecnologiaPrincipal` VARCHAR(45) NULL DEFAULT NULL,
  `tempoExperienciaTecnologiaPrincipal` VARCHAR(45) NULL DEFAULT NULL,
  `tecnologiaOpcional` VARCHAR(45) NULL DEFAULT NULL,
  `tempoExperienciaTecnologiaOpcional` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idcurriculo`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
