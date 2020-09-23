// based on https://codepen.io/trhino/pen/xyLAu

jQuery.fn.extend({

    wysiwyg: function () {
        
        this.each(function(index) {
            // Init
            var selector = "tyyitor_" + index;
            $(this).after('<div class="tyyitor" id="' + selector + '"></div>');
            $('#'+selector).append($(this));
            // Make an instance of original editor
            var selector_input = selector+'>'+$(this).prop('tagName');
            editor = $('#'+selector_input);
            // Hide the original editor
            editor.hide();
            editor.addClass('tyyitor_editor');
            // Menu Items
            editor.before(`
            <div>
                <div>
                <a title="undo" data-role='undo' href='javascript:void(0);' onclick='tyyitor_action(this);'>واگرد</a>
                <a title="redo" data-role='redo' href='javascript:void(0);' onclick='tyyitor_action(this);'>تکرار</a>
                </div>
                <div>
                <a title="bold" data-role='bold' href='javascript:void(0);' onclick='tyyitor_action(this);'><b>برجسته</b></a>
                <a title="italic" data-role='italic' href='javascript:void(0);' onclick='tyyitor_action(this);'><em>یه‌وری</em></a>
                <a title="underline" data-role='underline' href='javascript:void(0);' onclick='tyyitor_action(this);'><u>زیر‌خط</u></a>
                <a title="strikeThrough" data-role='strikeThrough' href='javascript:void(0);' onclick='tyyitor_action(this);'><strike>خطی</strike></a>
                </div>
                <div>
                <a title="justify left" data-role='justifyLeft' href='javascript:void(0);' onclick='tyyitor_action(this);'>چپ</a>
                <a title="justify center" data-role='justifyCenter' href='javascript:void(0);' onclick='tyyitor_action(this);'>وسط</a>
                <a title="justify right" data-role='justifyRight' href='javascript:void(0);' onclick='tyyitor_action(this);'>راست</a>
                <a title="justify full" data-role='justifyFull' href='javascript:void(0);' onclick='tyyitor_action(this);'>تمام</a>
                </div>
                <div>
                <a title="indent" data-role='indent' href='javascript:void(0);' onclick='tyyitor_action(this);'>تورفتگی راست</a>
                <a title="outdent" data-role='outdent' href='javascript:void(0);' onclick='tyyitor_action(this);'>تو رفتگی چپ</a>
                </div>
                <div>
                <a title="insert unordered list" data-role='insertUnorderedList' href='javascript:void(0);' onclick='tyyitor_action(this);'>لیست</a>
                <a title="insert ordered list" data-role='insertOrderedList' href='javascript:void(0);' onclick='tyyitor_action(this);'>لیست شمارشی</a>
                </div>
                <div>
                <a title="h3" data-role='h3' href='javascript:void(0);' onclick='tyyitor_action(this);'>زیر‌تیتر<sup>۳</sup></a>
                <a title="h2" data-role='h2' href='javascript:void(0);' onclick='tyyitor_action(this);'>سر‌تیتر<sup>۲</sup></a>
                
                <a title="p" data-role='p' href='javascript:void(0);' onclick='tyyitor_action(this);'>پاراگراف</a>
                </div>
                <div>
                <a title="subscript" data-role='subscript' href='javascript:void(0);' onclick='tyyitor_action(this);'><i class='icon-subscript'></i></a>
                <a title="superscript" data-role='superscript' href='javascript:void(0);' onclick='tyyitor_action(this);'><i class='icon-superscript'></i></a>
                </div>
            </div>
            `);
            // Get former value
            var value = '';
            if (editor.prop('tagName') == 'TEXTAREA') {
                value = editor.val();
            } else if (editor.prop('tagName') == 'INPUT') {
                value = editor.val(); // TODO: Check this line
            }
            // New editor's canvas
            $('#'+selector_input).before('<div class="tyyitor_canvas" contenteditable>' + value  + '</div>');
        });
    }
});

function tyyitor_action(sender) {
    // Define edit canvas
    selector_parent = $(sender.target).parent().attr('id');
    var canvas = $('#'+selector_parent+ '>.tyyitor_canvas');
    console.log(canvas);

    // do the main action
    var role = $(sender).data('role');
    switch (role) {
        case 'h2':
        case 'h3':
        case 'p':
            document.execCommand('formatBlock', false, role);
            break;
        default:
            document.execCommand(role, false, null);
            break;
    }
}

// On canvas content changed
$('body').on('DOMSubtreeModified', '.tyyitor_canvas', function(sender){

    // Get input to update
    selector_parent = $(sender.target).parent().attr('id');
    var editor = $('#'+selector_parent+ '>.tyyitor_editor');

    // Update original editor based on it's type (tagName)
    if (editor.prop('tagName') == 'TEXTAREA') {
        editor.val(sender.target.innerHTML);
    } else if (editor.prop('tagName') == 'INPUT') {
        editor.val(); // TODO: Check this line
    }
});