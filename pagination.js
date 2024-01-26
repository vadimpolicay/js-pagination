/* пагинация на чистом js

total_pages- общее число страниц
active_page- активная страница
N - желаемое число отображаемых страниц справа и слева от активной страницы

Пример для N = 1:
(total_pages = 12, active_page = 1)                      1 2 ...12 Next
(total_pages = 12, active_page = 4)                      Prev 1...3 4 5...12 Next

Пример для N = 2:
(total_pages = 123, active_page = 8)                     Prev 1...6 7 8 9 10...123 Next 
(total_pages = 7, active_page = 7)                       Prev 1 2 3 4 5 6 7  
(total_pages = 2, active_page = 2)                       Prev 1 2 
(total_pages = 1, active_page = 1)                       1

*/



const pagination = (total_pages, active_page) => {

    const N = 2

    if (!total_pages) {
        ul_content = "no results"
    }
    else if (total_pages == 1) {   //  если всего 1 страница
        ul_content = `<li class = '${active_page == 1 ? 'numb active' : 'numb'}'  
        onclick = 'pagination(${total_pages}, 1) '><span>1</span></li>`
    }
    else if (total_pages == 2) {   //  если всего 2 страницы
        let prev = `<li class='btn-prev' onclick = 'pagination(${total_pages}, ${active_page - 1}) '><span>Prev</span></li>`
        let next = `<li class='btn-next' onclick = 'pagination(${total_pages}, ${active_page + 1}) '><span>Next</span></li>`

        ul_content = (active_page == 1 ? '' : prev) +
            `<li class = '${active_page == 1 ? 'numb active' : 'numb'}' onclick = 'pagination(${total_pages}, 1) '> <span>1</span></li>
        <li class = '${active_page == 1 ? 'numb active' : 'numb'}' onclick = 'pagination(${total_pages}, 2) '><span>2</span></li>`
            + (active_page == 2 ? '' : next)
    }
    else { // если более страниц

        // вычисляем номера крайних страниц основного блока
        let left = active_page - N <= 1 ? 2 : active_page - N
        let right = active_page + N >= total_pages ? total_pages - 1 : active_page + N

        // логика отрисовки точек 
        // если есть страницы между 1ой и крайней левой, то они будут заменены на ...
        // если есть страницы между последней и крайней правой, то они будут заменены на ...
        let ldots = left > 2 ? `<li class='btn-dots'><span>...</span></li>` : ''
        let rdots = right < total_pages - 1 ? `<li class='btn-dots'><span>...</span></li>` : ''

        // логика отрисовки кнопок prev и next
        let prev = active_page == 1 ? '' : `<li class='btn-prev' onclick = 'pagination(${total_pages}, ${active_page - 1}) '><span>Prev</span></li>`
        let next = active_page == total_pages ? '' : `<li class='btn-next' onclick = 'pagination(${total_pages}, ${active_page + 1}) '><span>Next</span></li>`

        // формируем первую и последнюю кнопки
        let first_page = `<li class = '${active_page == 1 ? 'numb active' : 'numb'}' onclick = 'pagination(${total_pages}, 1) '><span>1</span></li>`
        let last_page = `<li class = '${active_page == total_pages ? 'numb active' : 'numb'}' onclick = 'pagination(${total_pages}, ${total_pages}) '><span>${total_pages}</span></li>`

        // формируем основной блок 
        main_block = ''
        for (let i = left; i <= right; i++) {
            main_block += `<li class = '${active_page == i ? 'numb active' : 'numb'}' 
            onclick = 'pagination(${total_pages}, ${i}) ' '
            ><span>${i}</span></li>`

        }
        // собираем разметку из элементов списка        
        let ul = document.querySelector('.pagination')
        let
            ul_content = prev + first_page + ldots + main_block + rdots + last_page + next
        ul.innerHTML = ul_content  // формируем список 
    }

}


pagination(10, 5)

