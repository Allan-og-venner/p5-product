<?php

/**
 * Class for the block_homework plugin. PDF reader that counts the words in a PDF file from the name of the file
 *
 * @package   block_homework
 * @copyright Year, You Name <your@email.address>
 * @author    group 11
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class pdf_word_count_reader
{

    /**
     * Reads the PDF as a string and counts words
     * uses extract_text_from_pdf_content
     * returns word count
     */
    public function count_words_in_pdf($pdfFilePath)
    {
        // Read the entire PDF file as a string
        $content = file_get_contents($pdfFilePath);

        // Clean up non-printable characters
        $content = preg_replace('/[^(\x20-\x7F)]*/', '', $content);

        // Extract text using regex to find BT ET(Begin Text and End Text) text objects
        // BT and ET(Begin Text and End Text) are text objects specific for PDF files
        // Basically a way of reading PDF files
        $text = $this->extract_text_from_pdf_content($content);

        // Count words in the extracted text
        $wordCount = str_word_count($text);

        return $wordCount;
    }

    /**
     * Extracts the text from BT and ET objects and adds it to a text string which is used in count_words_in_pdf.
     * returns the text from a pdf as string
     */
    private function extract_text_from_pdf_content($content)
    {
        $text = "";

        // Match all BT ET (Begin Text and End Text) sections
        if (preg_match_all('/BT(.*?)ET/s', $content, $matches)) {
            foreach ($matches[1] as $section) {
                // Extract text within parentheses and add it to our $text string
                if (preg_match_all('/\((.*?)\)/s', $section, $textMatches)) {
                    $text .= implode('', $textMatches[1]);
                }
            }
        }

        return $text;
    }
}
