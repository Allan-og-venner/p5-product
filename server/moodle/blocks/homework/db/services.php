<?php
// This file is part of Moodle - https://moodle.org/
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
// along with Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * homework/db/services.php
 *
 * @package   block_homework
 * @copyright 2024, cs-24-sw-5-01 <cs-24-sw-5-01@student.aau.dk>, cs-24-sw-5-13 <cs-24-sw-5-13@student.aau.dk>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 *
 */

defined('MOODLE_INTERNAL') || die();


$functions = [
    'block_homework_get_infohomework_modal' => [
        'classname'   => 'block_homework\external\get_infohomework_modal',
        'methodname'  => 'execute',
        'classpath'   => 'blocks/homework/classes/external/get_infohomework_modal.php',
        'description' => 'Get the homework info content',
        'type'        => 'read',
        'ajax'        => true,
    ],
    'block_homework_get_stats_modal' => [
        'classname'   => 'block_homework\external\get_stats_modal',
        'methodname'  => 'execute',
        'classpath'   => 'blocks/homework/classes/external/get_stats_modal.php',
        'description' => 'Get the homework stats content',
        'type'        => 'read',
        'ajax'        => true,
    ],
    'block_homework_save_homeworktime' => [
        'classname'   => 'block_homework\external\save_homeworktime',
        'methodname'  => 'execute',
        'classpath'   => 'blocks/homework/classes/external/save_homeworktime.php',
        'description' => 'Save homework time',
        'type'        => 'write',
        'ajax'        => true,
    ],
    'block_homework_get_homework' => [
        'classname'   => 'block_homework\external\get_homework',
        'methodname'  => 'execute',
        'classpath'   => 'blocks/homework/classes/external/get_homework.php',
        'description' => 'Get the sorted homework',
        'type'        => 'read',
        'ajax'        => true,
    ],
    'block_homework_get_courses' => [
        'classname'   => 'block_homework\external\get_courses',
        'methodname'  => 'execute',
        'classpath'   => 'blocks/homework/classes/external/get_courses.php',
        'description' => 'Get the courses',
        'type'        => 'read',
        'ajax'        => true,
    ],
    'block_homework_filter_homework' => [
        'classname'   => 'block_homework\external\filter_homework',
        'methodname'  => 'execute',
        'classpath'   => 'blocks/homework/classes/external/filter_homework.php',
        'description' => 'Filter the homework',
        'type'        => 'read',
        'ajax'        => true,
    ],
];

$services = [
    'block_homework_services' => [
        'functions' => [
            'block_homework_get_infohomework_modal',
            'block_homework_save_homeworktime',
            'block_homework_get_homework',
            'block_homework_get_courses',
            'block_homework_filter_homework',
        ],
        'restrictedusers' => 0,
        'enabled' => 1,
    ],
];
