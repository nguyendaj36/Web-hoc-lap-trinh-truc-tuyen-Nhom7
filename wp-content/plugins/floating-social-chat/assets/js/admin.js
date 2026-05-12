/**
 * Floating Social Chat – Admin JS (Hộp thư)
 */
(function ($) {
  'use strict';

  $(document).ready(function () {
    const $sendBtn   = $('#fsc-admin-send');
    const $input     = $('#fsc-admin-input');
    const $msgArea   = $('.fsc-conv-messages');

    if (!$sendBtn.length) return;

    const sessionId = $sendBtn.data('session');

    /* ─── Gửi phản hồi ─── */
    $sendBtn.on('click', sendReply);
    $input.on('keydown', function (e) {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        sendReply();
      }
    });

    function sendReply() {
      const msg = $input.val().trim();
      if (!msg) return;

      $sendBtn.prop('disabled', true).text('Đang gửi...');

      $.post(FSC_ADMIN.ajax_url, {
        action:  'fsc_admin_reply',
        nonce:   FSC_ADMIN.nonce,
        session: sessionId,
        message: msg,
      })
      .done(function (res) {
        if (res.success) {
          $input.val('');
          // Thêm bubble ngay
          const now = new Date();
          const h   = String(now.getHours()).padStart(2, '0');
          const m   = String(now.getMinutes()).padStart(2, '0');
          const safeMsg = $('<div>').text(msg).html().replace(/\n/g, '<br>');
          const html = '<div class="fsc-conv-msg fsc-msg-admin">'
            + '<div class="fsc-conv-bubble">' + safeMsg + '</div>'
            + '<time class="fsc-conv-time">' + h + ':' + m + ' - Vừa gửi</time>'
            + '</div>';
          $msgArea.append(html);
          $msgArea.scrollTop($msgArea[0].scrollHeight);
        } else {
          alert('Lỗi: ' + (res.data && res.data.msg ? res.data.msg : 'Không xác định'));
        }
      })
      .fail(function () {
        alert('Lỗi kết nối. Vui lòng thử lại.');
      })
      .always(function () {
        $sendBtn.prop('disabled', false).text('Gửi phản hồi ➤');
      });
    }

    /* ─── Auto scroll xuống cuối ─── */
    if ($msgArea.length) {
      $msgArea.scrollTop($msgArea[0].scrollHeight);
    }
  });

})(jQuery);
