# Реалізація інформаційного та програмного забезпечення

```sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema DBLabs
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `DBLabs` ;

-- -----------------------------------------------------
-- Schema DBLabs
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DBLabs` DEFAULT CHARACTER SET utf8 ;
USE `DBLabs` ;

-- -----------------------------------------------------
-- Table `DBLabs`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Role` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`User` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`User` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `password` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `surname` VARCHAR(45) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `picture` MEDIUMBLOB NULL,
  `Role_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_User_Role_idx` (`Role_id` ASC) VISIBLE,
  CONSTRAINT `fk_User_Role`
    FOREIGN KEY (`Role_id`)
    REFERENCES `DBLabs`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`Quiz`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Quiz` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Quiz` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`Question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Question` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Question` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  `number` INT UNSIGNED NOT NULL,
  `description` VARCHAR(100) NULL,
  `Quiz_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Question_Quiz1_idx` (`Quiz_id` ASC) VISIBLE,
  CONSTRAINT `fk_Question_Quiz1`
    FOREIGN KEY (`Quiz_id`)
    REFERENCES `DBLabs`.`Quiz` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`Answer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Answer` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Answer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(100) NULL,
  `option` VARCHAR(45) NULL,
  `file` MEDIUMBLOB NULL,
  `Question_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Answer_Question1_idx` (`Question_id` ASC) VISIBLE,
  CONSTRAINT `fk_Answer_Question1`
    FOREIGN KEY (`Question_id`)
    REFERENCES `DBLabs`.`Question` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`Respondent`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Respondent` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Respondent` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `User_id` INT NOT NULL,
  `Answer_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Respondent_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_Respondent_Answer1_idx` (`Answer_id` ASC) VISIBLE,
  CONSTRAINT `fk_Respondent_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `DBLabs`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Respondent_Answer1`
    FOREIGN KEY (`Answer_id`)
    REFERENCES `DBLabs`.`Answer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`Option`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`Option` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`Option` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL,
  `number` INT UNSIGNED NOT NULL,
  `Question_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Option_Question1_idx` (`Question_id` ASC) VISIBLE,
  CONSTRAINT `fk_Option_Question1`
    FOREIGN KEY (`Question_id`)
    REFERENCES `DBLabs`.`Question` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DBLabs`.`SelectedOption`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DBLabs`.`SelectedOption` ;

CREATE TABLE IF NOT EXISTS `DBLabs`.`SelectedOption` (
  `Answer_id` INT NOT NULL,
  `Option_id` INT NOT NULL,
  INDEX `fk_SelectedOption_Answer1_idx` (`Answer_id` ASC) VISIBLE,
  INDEX `fk_SelectedOption_Option1_idx` (`Option_id` ASC) VISIBLE,
  CONSTRAINT `fk_SelectedOption_Answer1`
    FOREIGN KEY (`Answer_id`)
    REFERENCES `DBLabs`.`Answer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SelectedOption_Option1`
    FOREIGN KEY (`Option_id`)
    REFERENCES `DBLabs`.`Option` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `DBLabs`.`Role`
-- -----------------------------------------------------
START TRANSACTION;
USE `DBLabs`;
INSERT INTO `DBLabs`.`Role` (`name`, `description`) VALUES ('Respondent', 'A user that taking a survey');
INSERT INTO `DBLabs`.`Role` (`name`, `description`) VALUES ('Editor', 'The user who edits the survey');
INSERT INTO `DBLabs`.`Role` (`name`, `description`) VALUES ('Admin', 'The user is the owner of the survey');

COMMIT;
```

# RESTfull сервіс для управління даними

**Вхідний файл програми**
```js
const express = require("express");
const cors = require("cors");
const router = require("./routes");
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");

const app= express ();
app.use(express.json());
app.use(cors()) ;
app.use(router);

app.all("*", (req, res, next) => {
next (new AppError (`The URL ${req.originalUrl} does not exists`, 404));
});
app.use(errorHandler);

const PORT = 3000;
app.listen (PORT, () => {
console.log(`Server running on port ${PORT}`);
});

module.exports = app;
```

**Файл для встановленя з'єднання з базою данних**
```js
require('dotenv').config();

const mysql = require("mysql2");

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

conn.connect();

module.exports = conn;
```


## CRUD для опитуваннь

**Маршути**

```js
const express = require("express");
const controller = require("../controllers/index.js");
const router = express.Router();

router.route("/quiz").get(controller.getAllQuizzes).post(controller.createQuiz);
router.route("/quiz/:id").get(controller.getQuizById).put(controller.updateQuiz).delete(controller.deleteQuiz);

module.exports = router;
```
**Контролер**

```js
const AppError = require("../utils/appError");
const connection = require("../service/db.js");

exports.getAllQuizzes = (req, res, next) => {
    connection.query("SELECT * FROM quiz", function (err, data, fields) {
        if (data.length === 0) return next(new AppError(err, 404))
        if (err) return next(new AppError(err));
        res.status(200).json({
            status: "success",
            length: data?.length,
            data: data,
        })
    })
}

exports.createQuiz = (req, res, next) => {
    if (!req.body) return next(new AppError("No form data found", 404));
    const values = [
        req.body.description,
        req.body.name,
    ];

    connection.query(
        "INSERT INTO quiz (description, name) VALUES(?)",
        [values],
        function (err, data, fields) {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "quiz added",
            });
        }
    );
};

exports.getQuizById = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No quiz id found", 404))
    }
    connection.query(
        "SELECT * FROM quiz WHERE id = ?",
        [req.params.id],
        function (err, data, fields) {
            if (data.length === 0) return next(new AppError(err, 404))
            if (err) return next(new AppError(err, 500))
            res.status(200).json({
                status: "success",
                length: data?.length,
                data: data,
            })
        }
    )
}

exports.updateQuiz = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No quiz id found", 404))
    }
    connection.query(
        "UPDATE quiz SET description=?, name=? WHERE id=?",
        [
            req.body.description,
            req.body.name,
            req.params.id,
        ],
        (err, data, fields) => {
            if (err) return next(new AppError(err, 500));
            res.status(201).json({
                status: "success",
                message: "quiz info updated",
            })
        }
    )
}

exports.deleteQuiz = (req, res, next) => {
    if (!req.params.id) {
        return next(new AppError("No quiz id found", 404))
    }
    connection.query(
        "DELETE FROM quiz WHERE id=?",
        [req.params.id],
        function (err, fields) {
            if (err) return next(new AppError(err, 500))
            res.status(201).json({
                status: "success",
                message: "quiz deleted",
            })
        }
    )
}
```



