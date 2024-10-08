<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
//defined('MOODLE_INTERNAL') || die();

/**
 * General functions for homework plugin
 *
 * @package   mod_homework
 * @copyright 2024, cs-24-sw-5-01 <cs-24-sw-5-01@student.aau.dk>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 *
 */

/**
 * @param $homeworkdata
 * @return bool|int
 * @throws dml_exception
 */

function homework_add_instance($homeworkdata){
    global $DB;

    $homeworkdata->timecreated = time();
    $homeworkdata->timemodified = time();

    $homeworkdata->id = $DB->insert_record('homework', $homeworkdata);

    return $homeworkdata->id;
}

/**
 * @param $homeworkdata
 * @return bool
 * @throws dml_exception
 */

function homework_update_instance($homeworkdata){
    global $DB;

    $homeworkdata->timemodified = time();
    $homeworkdata->id = $homeworkdata->instance;

    $DB->update_record('homework', $homeworkdata);

    return true;
}

/**
 * @param $id
 * @return bool
 * @throws dml_exception
 */

function homework_delete_instance($id){
    global $DB;

    $DB->delete_records('homework', ['id' => $id]);

    return true;
}