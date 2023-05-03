/*=========================================================================================
    File Name: app-todo.js
    Description: app-todo
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: PIXINVENT
    Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

var todoList = [];

$.getJSON('home/gettodos', function (r) {
    todoListesi = r;
    //$('.loading').remove();
    for (todo of todoListesi) {
        var todoObj = {
            id: todo.id,
            title: todo.title,
            date: todo.updatedOn,
            isDone: todo.isDone
        }
        todoList.push(todoObj);
        //console.log(todoObj);

    }
    init();
})


function init() {

    Listele();

    function Listele() {
        todoTaskList = $('.todo-task-list');
        $(todoTaskList).empty();
        for (todoObj of todoList) {
            var todoDone;
            var todoDoneClass = "";
            if (todoObj.isDone) { todoDone = "checked=\"\""; todoDoneClass = "completed"; }
            else { todoDone = " " }
            //console.log(todoDone);
            $(todoTaskList).prepend(
                '<li class="todo-item ' +
                todoDoneClass +
                '"> <div class="todo-title-wrapper">' +
                '<div class="todo-title-area">' +
                "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"feather feather-more-vertical drag-icon\"><circle cx=\"12\" cy=\"12\" r=\"1\"></circle><circle cx=\"12\" cy=\"5\" r=\"1\"></circle><circle cx=\"12\" cy=\"19\" r=\"1\"></circle></svg>" +
                '<div class="title-wrapper">' +
                '<div class="form-check">' +
                '<input type="checkbox" class="form-check-input" id="id' +
                todoObj.id + ' " ' +
                todoDone +
                '" />' +
                '<label class="form-check-label" for="id' +
                todoObj.id +
                '"></label>' +
                '</div>' +
                '<span hidden class="todo-id">' +
                todoObj.id +
                '</span>' +
                '<span class="todo-title">' +
                todoObj.title +
                '</span>' +
                '</div>' +
                '</div>' +
                '<div class="todo-item-action">' +
                '<div class="badge-wrapper me-1">' +
                "<span class=\"badge rounded - pill badge - light - primary\">Team</span>" +
                '</div>' +
                '<small class="text-nowrap text-muted me-1">' +
                todoObj.date +
                '</small>' +
                '<div class="avatar">' +
                '<img src="' +
                "../../../app-assets/images/portrait/small/avatar-s-4.jpg" +
                '" alt="' +
                "user-avatar" +
                '" height="28" width="28">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</li>'
            );
        }
    }




    'use strict';

    $(function () {
        var taskTitle,
            flatPickr = $('.task-due-date'),
            newTaskModal = $('.sidebar-todo-modal'),
            newTaskForm = $('#form-modal-todo'),
            favoriteStar = $('.todo-item-favorite'),
            modalTitle = $('.modal-title'),
            addBtn = $('.add-todo-item'),
            addTaskBtn = $('.add-task button'),
            updateTodoItem = $('.update-todo-item'),
            updateBtns = $('.update-btn'),
            deleteBtns = $('.delete-btn'),
            taskDesc = $('#task-desc'),
            taskAssignSelect = $('#task-assigned'),
            taskTag = $('#task-tag'),
            overlay = $('.body-content-overlay'),
            menuToggle = $('.menu-toggle'),
            sidebarToggle = $('.sidebar-toggle'),
            sidebarLeft = $('.sidebar-left'),
            sidebarMenuList = $('.sidebar-menu-list'),
            todoFilter = $('#todo-search'),
            sortAsc = $('.sort-asc'),
            sortDesc = $('.sort-desc'),
            todoTaskList = $('.todo-task-list'),
            todoTaskListWrapper = $('.todo-task-list-wrapper'),
            listItemFilter = $('.list-group-filters'),
            noResults = $('.no-results'),
            checkboxId = 100,
            isRtl = $('html').attr('data-textdirection') === 'rtl';

        var assetPath = '../../../app-assets/';
        if ($('body').attr('data-framework') === 'laravel') {
            assetPath = $('body').attr('data-asset-path');
        }

        // if it is not touch device
        if (!$.app.menu.is_touch_device()) {
            if (sidebarMenuList.length > 0) {
                var sidebarListScrollbar = new PerfectScrollbar(sidebarMenuList[0], {
                    theme: 'dark'
                });
            }
            if (todoTaskListWrapper.length > 0) {
                var taskListScrollbar = new PerfectScrollbar(todoTaskListWrapper[0], {
                    theme: 'dark'
                });
            }
        }
        // if it is a touch device
        else {
            sidebarMenuList.css('overflow', 'scroll');
            todoTaskListWrapper.css('overflow', 'scroll');
        }

        // Add class active on click of sidebar filters list
        if (listItemFilter.length) {
            listItemFilter.find('a').on('click', function () {
                if (listItemFilter.find('a').hasClass('active')) {
                    listItemFilter.find('a').removeClass('active');
                }
                $(this).addClass('active');
            });
        }

        // Init D'n'D
        var dndContainer = document.getElementById('todo-task-list');
        if (typeof dndContainer !== undefined && dndContainer !== null) {
            dragula([dndContainer], {
                moves: function (el, container, handle) {
                    return handle.classList.contains('drag-icon');
                }
            });
        }

        // Main menu toggle should hide app menu
        if (menuToggle.length) {
            menuToggle.on('click', function (e) {
                sidebarLeft.removeClass('show');
                overlay.removeClass('show');
            });
        }

        // Todo sidebar toggle
        if (sidebarToggle.length) {
            sidebarToggle.on('click', function (e) {
                e.stopPropagation();
                sidebarLeft.toggleClass('show');
                overlay.addClass('show');
            });
        }

        // On Overlay Click
        if (overlay.length) {
            overlay.on('click', function (e) {
                sidebarLeft.removeClass('show');
                overlay.removeClass('show');
                $(newTaskModal).modal('hide');
            });
        }

        // Assign task
        function assignTask(option) {
            if (!option.id) {
                return option.text;
            }
            var $person =
                '<div class="d-flex align-items-center">' +
                '<img class="d-block rounded-circle me-50" src="' +
                $(option.element).data('img') +
                '" height="26" width="26" alt="' +
                option.text +
                '">' +
                '<p class="mb-0">' +
                option.text +
                '</p></div>';

            return $person;
        }

        // Task Assign Select2
        if (taskAssignSelect.length) {
            taskAssignSelect.wrap('<div class="position-relative"></div>');
            taskAssignSelect.select2({
                placeholder: 'Unassigned',
                dropdownParent: taskAssignSelect.parent(),
                templateResult: assignTask,
                templateSelection: assignTask,
                escapeMarkup: function (es) {
                    return es;
                }
            });
        }

        // Task Tags
        if (taskTag.length) {
            taskTag.wrap('<div class="position-relative"></div>');
            taskTag.select2({
                placeholder: 'Select tag'
            });
        }

        // Favorite star click
        if (favoriteStar.length) {
            $(favoriteStar).on('click', function () {
                $(this).toggleClass('text-warning');
            });
        }

        // Flat Picker
        if (flatPickr.length) {
            flatPickr.flatpickr({
                dateFormat: 'Y-m-d',
                defaultDate: 'today',
                onReady: function (selectedDates, dateStr, instance) {
                    if (instance.isMobile) {
                        $(instance.mobileInput).attr('step', null);
                    }
                }
            });
        }

        // Todo Description Editor
        if (taskDesc.length) {
            var todoDescEditor = new Quill('#task-desc', {
                bounds: '#task-desc',
                modules: {
                    formula: true,
                    syntax: true,
                    toolbar: '.desc-toolbar'
                },
                placeholder: 'Write Your Description',
                theme: 'snow'
            });
        }

        // On add new item button click, clear sidebar-right field fields
        if (addTaskBtn.length) {
            addTaskBtn.on('click', function (e) {
                addBtn.removeClass('d-none');
                updateBtns.addClass('d-none');
                deleteBtns.addClass('d-none');
                modalTitle.text('Add Task');
                // newTaskModal.modal('show');
                sidebarLeft.removeClass('show');
                overlay.removeClass('show');
                newTaskModal.find('.new-todo-item-title').val('');
                var quill_editor = taskDesc.find('.ql-editor');
                quill_editor[0].innerHTML = '';
            });
        }

        // Add New ToDo List Item

        // To add new todo form
        if (newTaskForm.length) {
            newTaskForm.validate({
                ignore: '.ql-container *', // ? ignoring quill editor icon click, that was creating console error
                rules: {
                    todoTitleAdd: {
                        required: true
                    },
                    'task-assigned': {
                        required: true
                    },
                    'task-due-date': {
                        required: true
                    }
                }
            });

            newTaskForm.on('submit', function (e) {
                e.preventDefault();
                var isValid = newTaskForm.valid();
                if (isValid) {
                    checkboxId++;
                    var assignedTo = $('#task-assigned').val(),
                        todoBadge = '',
                        membersImg = {
                            'Phill Buffer': assetPath + 'images/portrait/small/avatar-s-3.jpg',
                            'Chandler Bing': assetPath + 'images/portrait/small/avatar-s-1.jpg',
                            'Ross Geller': assetPath + 'images/portrait/small/avatar-s-4.jpg',
                            'Monica Geller': assetPath + 'images/portrait/small/avatar-s-6.jpg',
                            'Joey Tribbiani': assetPath + 'images/portrait/small/avatar-s-2.jpg',
                            'Rachel Green': assetPath + 'images/portrait/small/avatar-s-11.jpg'
                        };

                    var todoTitle = $('.sidebar-todo-modal .new-todo-item-title').val();
                    var date = $('.sidebar-todo-modal .task-due-date').val(),
                        selectedDate = new Date(date),
                        month = new Intl.DateTimeFormat('en', { month: 'short' }).format(selectedDate),
                        day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(selectedDate),
                        todoDate = month + ' ' + day;


                    // ADD TODO
                    var quill_editor = $('#task-desc .ql-editor p');

                    var Title = todoTitle;
                    var Description = quill_editor[0].innerHTML;
                    var FinishTime = date;

                    $.post("/home/addtodo", { Title, Description, FinishTime });
                    setTimeout('', 2000);
                    Listele();


                    // Badge calculation loop
                    var selected = $('.task-tag').val();
                    var badgeColor = {
                        Team: 'primary',
                        Low: 'success',
                        Medium: 'warning',
                        High: 'danger',
                        Update: 'info'
                    };
                    $.each(selected, function (index, value) {
                        todoBadge +=
                            '<span class="badge rounded-pill badge-light-' + badgeColor[value] + ' me-50">' + value + '</span>';
                    });
                    // HTML Output
                    /*
                    if (todoTitle != '') {
                      $(todoTaskList).prepend(
                        '<li class="todo-item">' +
                          '<div class="todo-title-wrapper">' +
                          '<div class="todo-title-area">' +
                          feather.icons['more-vertical'].toSvg({ class: 'drag-icon' }) +
                          '<div class="title-wrapper">' +
                          '<div class="form-check">' +
                          '<input type="checkbox" class="form-check-input" id="customCheck' +
                          checkboxId +
                          '" />' +
                          '<label class="form-check-label" for="customCheck' +
                          checkboxId +
                          '"></label>' +
                          '</div>' +
                          '<span class="todo-title">' +
                          todoTitle +
                          '</span>' +
                          '</div>' +
                          '</div>' +
                          '<div class="todo-item-action">' +
                          '<span class="badge-wrapper me-1">' +
                          todoBadge +
                          '</span>' +
                          '<small class="text-nowrap text-muted me-1">' +
                          todoDate +
                          '</small>' +
                          '<div class="avatar">' +
                          '<img src="' +
                          membersImg[assignedTo] +
                          '" alt="' +
                          assignedTo +
                          '" height="28" width="28">' +
                          '</div>' +
                          '</div>' +
                          '</div>' +
                          '</li>'
                      );
                    }
                    */
                    toastr['success']('Data Saved', '💾 Task Action!', {
                        closeButton: true,
                        tapToDismiss: false,
                        rtl: isRtl
                    });
                    $(newTaskModal).modal('hide');
                    overlay.removeClass('show');
                }
            });
        }

        // Task checkbox change
        todoTaskListWrapper.on('change', '.form-check', function (event) {
            var $this = $(this).find('input');
            var id = $(this).parent().find('.todo-id').html();
            if ($this.prop('checked')) {
                $this.closest('.todo-item').addClass('completed');

                $.post("/home/donetodo", { id });

                toastr['success']('Task Completed', 'Congratulations!! 🎉', {
                    closeButton: true,
                    tapToDismiss: false,
                    rtl: isRtl
                });
            } else {
                $this.closest('.todo-item').removeClass('completed');
                $.post("/home/undonetodo", { id });
            }
        });
        todoTaskListWrapper.on('click', '.form-check', function (event) {
            event.stopPropagation();
        });

        // To open todo list item modal on click of item
        $(document).on('click', '.todo-task-list-wrapper .todo-item', function (e) {
            newTaskModal.modal('show');
            addBtn.addClass('d-none');
            updateBtns.removeClass('d-none');
            deleteBtns.removeClass('d-none');
            if ($(this).hasClass('completed')) {
                modalTitle.html(
                    '<button type="button" class="btn btn-sm btn-outline-success complete-todo-item waves-effect waves-float waves-light" data-bs-dismiss="modal">Completed</button>'
                );
            } else {
                modalTitle.html(
                    '<button type="button" class="btn btn-sm btn-outline-secondary complete-todo-item waves-effect waves-float waves-light" data-bs-dismiss="modal">Mark Complete</button>'
                );
            }
            var id = $(this).find('.todo-id').html();
            var link = "/home/gettodobyid?id=" + id;

            $.getJSON(link, function (r) {
                todo = r;
                //$('.loading').remove();
                //console.log(todo);
                var todoObj = {
                    id: todo.id,
                    title: todo.title,
                    description: todo.description,
                    date: todo.updatedOn,
                    isDone: todo.isDone

                }
                //console.log(todoObj);

                quill_editor[0].innerHTML = todoObj.description;
                console.log($('#todoId'));
                $('#todoId').text(todoObj.id);

                flatPickr.flatpickr({
                    dateFormat: 'Y-m-d',
                    defaultDate: todoObj.date,
                    onReady: function (selectedDates, dateStr, instance) {
                        if (instance.isMobile) {
                            $(instance.mobileInput).attr('step', null);
                        }
                    }
                });
                //init();
            })

            //console.log(todoObj);

            taskTag.val('').trigger('change');
            var quill_editor = $('#task-desc .ql-editor'); // ? Dummy data as not connected with API or anything else
            taskTitle = $(this).find('.todo-title');
            var $title = $(this).find('.todo-title').html();

            // apply all variable values to fields
            newTaskForm.find('.new-todo-item-title').val($title);
        });
        deleteBtns.on('click', function (e) {
            e.preventDefault();
            var id = $('#todoId').text();
            console.log(id);
            $.post("/home/deletetodo", { id });



            toastr['success']('Data Deleted', '💾 Task Action!', {
                closeButton: true,
                tapToDismiss: false,
                rtl: isRtl
            });
            $(newTaskModal).modal('hide');

        });
        // Updating Data Values to Fields
        if (updateTodoItem.length) {
            updateTodoItem.on('click', function (e) {

                e.preventDefault();

                var title = newTaskForm.find('.new-todo-item-title').val();
                $(taskTitle).text(title);
                var id = $('#todoId').text();
                var description = $('#task-desc .ql-editor p');
                description = description[0].innerHTML;
                $.post("/home/updatetodo", { id, title, description });

                toastr['success']('Data Saved', '💾 Task Action!', {
                    closeButton: true,
                    tapToDismiss: false,
                    rtl: isRtl
                });
                $(newTaskModal).modal('hide');

            });
        }

        // Sort Ascending
        if (sortAsc.length) {
            sortAsc.on('click', function () {
                todoTaskListWrapper
                    .find('li')
                    .sort(function (a, b) {
                        return $(b).find('.todo-title').text().toUpperCase() < $(a).find('.todo-title').text().toUpperCase() ? 1 : -1;
                    })
                    .appendTo(todoTaskList);
            });
        }
        // Sort Descending
        if (sortDesc.length) {
            sortDesc.on('click', function () {
                todoTaskListWrapper
                    .find('li')
                    .sort(function (a, b) {
                        return $(b).find('.todo-title').text().toUpperCase() > $(a).find('.todo-title').text().toUpperCase() ? 1 : -1;
                    })
                    .appendTo(todoTaskList);
            });
        }

        // Filter task
        if (todoFilter.length) {
            todoFilter.on('keyup', function () {
                var value = $(this).val().toLowerCase();
                if (value !== '') {
                    $('.todo-item').filter(function () {
                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
                    });
                    var tbl_row = $('.todo-item:visible').length; //here tbl_test is table name

                    //Check if table has row or not
                    if (tbl_row == 0) {
                        if (!$(noResults).hasClass('show')) {
                            $(noResults).addClass('show');
                        }
                    } else {
                        $(noResults).removeClass('show');
                    }
                } else {
                    // If filter box is empty
                    $('.todo-item').show();
                    if ($(noResults).hasClass('show')) {
                        $(noResults).removeClass('show');
                    }
                }
            });
        }

        // For chat sidebar on small screen
        if ($(window).width() > 992) {
            if (overlay.hasClass('show')) {
                overlay.removeClass('show');
            }
        }
    });

    $(window).on('resize', function () {
        // remove show classes from sidebar and overlay if size is > 992
        if ($(window).width() > 992) {
            if ($('.body-content-overlay').hasClass('show')) {
                $('.sidebar-left').removeClass('show');
                $('.body-content-overlay').removeClass('show');
                $('.sidebar-todo-modal').modal('hide');
            }
        }
    });



}

