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

/**
 *
 *
 * @package   mod_homework
 * @copyright 2024, cs-24-sw-5-01 <cs-24-sw-5-01@student.aau.dk>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 *
 */

defined('MOODLE_INTERNAL') || die();

// The capabilities for the homework module.
// Capabilities define different levels of permissions for the module.
$capabilities = [

    // Allows all roles to view the homework.
    'mod/homework:view' => [
        'captype' => 'read',
        'contextlevel' => CONTEXT_MODULE,
        'archetypes' => [
            'guest' => CAP_ALLOW,
            'student' => CAP_ALLOW,
            'teacher' => CAP_ALLOW,
            'editingteacher' => CAP_ALLOW,
            'manager' => CAP_ALLOW,
        ],
    ],
    // Add and remove materials.
    'mod/homework:edit' => [
        'riskbitmask' => RISK_SPAM,
        'captype' => 'write',
        'contextlevel' => CONTEXT_MODULE,
        'archetypes' => [
            'student' => CAP_PREVENT,
            'editingteacher' => CAP_ALLOW,
            'manager' => CAP_ALLOW,
        ],
    ],

    // Functionality to add the activity to course.
    'mod/homework:addinstance' => [
        'riskbitmask' => RISK_XSS,

        'captype' => 'write',
        'contextlevel' => CONTEXT_COURSE,
        'archetypes' => [
            'editingteacher' => CAP_ALLOW,
            'manager' => CAP_ALLOW,        ],
        'clonepermissionsfrom' => 'moodle/course:manageactivities',
    ],
    'mod/homework:managefiles' => [
        'captype' => 'write', // This capability is related to writing files (management).
        'contextlevel' => CONTEXT_MODULE, // The capability applies within the module context.
        'archetypes' => [
            'editingteacher' => CAP_ALLOW, // Editing teachers can manage files.
            'teacher' => CAP_ALLOW, // Teachers can manage files.
            'student' => CAP_PREVENT, // Students cannot manage files.
            'guest' => CAP_PREVENT, // Guests cannot manage files.
        ],
    ],


];
