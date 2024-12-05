import $ from 'jquery';
import Ajax from 'core/ajax';
/**
 * homework/amd/src/sort.js
 *
 * @package
 * @copyright 2024, cs-24-sw-5-13 <cs-24-sw-5-13@student.aau.dk>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 *
 */

export const init = async() => {
    $('#sort').on('change', () => {
        Ajax.call([{
            methodname: 'block_homework_get_homework',
            args: {sort: $('#sort').val()},
            done: async function(response) {
                let homework = JSON.parse(response.homework);
                document.getElementById("outer-box").innerHTML = "";
                homework.forEach((homework) => {
                    let box = document.createElement("div");
                    box.classList.add("infobox");

                    let h22 = document.createElement("h2");
                    h22.innerHTML = `${homework.course}`;
                    box.appendChild(h22);

                    let h2 = document.createElement("h2");
                    h2.innerHTML = `${homework.name}`;
                    box.appendChild(h2);

                    let h3 = document.createElement("h3");
                    h3.innerHTML = homework.duedate;
                    box.appendChild(h3);

                    let p = document.createElement("p");
                    p.innerHTML = `${homework.intro}`;
                    box.appendChild(p);

                    let button = document.createElement("button");
                    button.classList.add("timebutton");
                    button.setAttribute("data-homework-id", homework.id);
                    button.setAttribute("id", homework.id);
                    button.innerHTML = "Time";
                    box.appendChild(button);

                    document.getElementById("outer-box").appendChild(box);
                });
            },
            fail: (error) => {
                console.log(error);
                throw new Error(`Failed to sort homework: ${error}`);
            }
        }]);
    });
};

