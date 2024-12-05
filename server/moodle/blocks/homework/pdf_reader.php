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

defined('MOODLE_INTERNAL') || die();

// Require for the pdfparser library.
require_once(__DIR__ . "/../../lib/pdfparser/pdfparser-2.11.0/alt_autoload.php-dist");

/**
 * Class for the block_homework plugin. PDF reader that counts the words in a PDF file
 *
 * @package   block_homework
 * @copyright Year, You Name <your@email.address>
 * @author    group 11
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class pdf_reader {
    /**
     * Reads the PDF using smalot/pdfparser library, which is also added to the project under moodle/lib/pdfparser
     * returns word count
     */
    public function countwordsinpdf($file) {

        // Make sure the file object is of type stored_file and contains the correct file path.
        if (!$file instanceof \stored_file) {
            throw new \Exception("Expected a stored_file object.");
        }

        // We need to make a temporary file because moodle stores files in a virtual file system and the library.
        // needs a physical file to read it and count the words.

        // Get the temporary file path to save the file content for processing.
        $tempfilepath = tempnam(sys_get_temp_dir(), 'pdf_');

        // Open the temporary file for writing.
        $filehandle = fopen($tempfilepath, 'w');
        if (!$filehandle) {
            throw new \Exception("Could not open temporary file for writing.");
        }

        // Get the file content from the stored file and write it to the temporary file.
        $filecontent = $file->get_content();
        fwrite($filehandle, $filecontent);
        fclose($filehandle);

        // Use the temp file path with the PDF parser.
        $pdfparser = new \Smalot\PdfParser\Parser();

        // Try catch for the actual parsing and word counting, the temp file is deleted in case of errors for clean up.
        try {
            // Parse the PDF file using the temporary file path.
            $pdf = $pdfparser->parseFile($tempfilepath);

            // Get the text content of the PDF.
            $text = $pdf->getText();

            // Count words in the PDF.
            $wordcount = str_word_count($text);


            // Delete the temporary file after processing for clean up.
            unlink($tempfilepath);

            return $wordcount;
        } catch (\Exception $e) {
            // Delete the temporary file in case of error.
            unlink($tempfilepath);

            // Handle any errors that occur during parsing.
            return "Error parsing PDF: " . $e->getMessage();
        }
    }
}
