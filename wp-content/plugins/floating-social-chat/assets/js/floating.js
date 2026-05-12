/**
 * Floating Social Chat – Frontend JS
 */
(function ($) {
  'use strict';

  /* ─── State ─── */
  var menuOpen    = false;
  var chatOpen    = false;
  var sessionId   = '';
  var userName    = '';
  var userEmail   = '';
  var lastMsgId   = 0;
  var pollTimer   = null;
  var chatStarted = false;
  var isLoggedIn  = false;

  /* ─── Elements ─── */
  var $toggle    = $('#fsc-toggle');
  var $menu      = $('#fsc-menu');
  var $chat      = $('#fsc-chat');
  var $chatClose = $('#fsc-chat-close');
  var $openChat  = $('#fsc-open-chat');
  var $intro     = $('#fsc-intro');
  var $nameInput = $('#fsc-name');
  var $emailInput= $('#fsc-email');
  var $startBtn  = $('#fsc-start');
  var $introErr  = $('#fsc-intro-error');
  var $body      = $('#fsc-body');
  var $messages  = $('#fsc-messages');
  var $footer    = $('#fsc-footer');
  var $input     = $('#fsc-input');
  var $send      = $('#fsc-send');

  /* ─── Init ─── */
  function init() {
    sessionId = localStorage.getItem('fsc_session');
    if (!sessionId) {
      sessionId = 'fsc_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);
      localStorage.setItem('fsc_session', sessionId);
    }

    // Kiểm tra user WordPress đã đăng nhập chưa
    if (FSC.user && FSC.user.name) {
      isLoggedIn  = true;
      userName    = FSC.user.name;
      userEmail   = FSC.user.email || '';
      chatStarted = true;
      renderLoggedInIntro();
    } else {
      // Chưa đăng nhập: lấy từ localStorage nếu đã chat lần trước
      userName  = localStorage.getItem('fsc_name')  || '';
      userEmail = localStorage.getItem('fsc_email') || '';
      if (userName) {
        $nameInput.val(userName);
        $emailInput.val(userEmail);
      }
    }

    bindEvents();
  }

  /* ─── Giao diện intro cho user đã đăng nhập ─── */
  /* Che email: giữ 3 ký tự đầu, ẩn phần còn lại trước @, giữ domain */
  function maskEmail(email) {
    if (!email || email.indexOf('@') === -1) return '';
    var parts  = email.split('@');
    var local  = parts[0];
    var domain = parts[1];
    var visible = local.length > 3 ? local.slice(0, 3) : local.slice(0, 1);
    return visible + '***@' + domain;
  }

  function renderLoggedInIntro() {
    var initial     = escHtml(userName.charAt(0).toUpperCase());
    var maskedEmail = maskEmail(userEmail);
    var html =
      '<div class="fsc-user-info">' +
        '<div class="fsc-user-avatar">' + initial + '</div>' +
        '<div class="fsc-user-details">' +
          '<strong>' + escHtml(userName) + '</strong>' +
          (maskedEmail ? '<small>' + escHtml(maskedEmail) + '</small>' : '') +
        '</div>' +
      '</div>' +
      '<p class="fsc-greeting-logged">Xin chào <strong>' + escHtml(userName) + '</strong>! Có gì cần hỗ trợ không?</p>' +
      '<button id="fsc-start-logged">Bắt đầu trò chuyện →</button>';

    $intro.html(html);
    $('#fsc-start-logged').on('click', function () {
      chatStarted = true;
      startChatView();
    });
  }

  /* ─── Events ─── */
  function bindEvents() {
    $toggle.on('click', toggleMenu);

    $openChat.on('click', function (e) {
      e.stopPropagation();
      openChatWindow();
    });

    $chatClose.on('click', closeChatWindow);

    // Form nhập tên (khách chưa đăng nhập)
    $startBtn.on('click', handleStart);
    $nameInput.on('keydown', function (e) {
      if (e.key === 'Enter') handleStart();
    });

    // Gửi tin nhắn
    $send.on('click', sendMessage);
    $input.on('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Auto-grow textarea
    $input.on('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });

    // Click ngoài đóng menu
    $(document).on('click', function (e) {
      if (!$(e.target).closest('#fsc-root').length) {
        closeMenu();
      }
    });
  }

  /* ─── Toggle Menu ─── */
  function toggleMenu() {
    menuOpen = !menuOpen;
    $toggle.toggleClass('fsc-open', menuOpen).attr('aria-expanded', menuOpen);
    $menu.toggleClass('fsc-open', menuOpen).attr('aria-hidden', !menuOpen);
    if (!menuOpen) closeChatWindow();
  }

  function closeMenu() {
    if (!menuOpen) return;
    menuOpen = false;
    $toggle.removeClass('fsc-open').attr('aria-expanded', 'false');
    $menu.removeClass('fsc-open').attr('aria-hidden', 'true');
    closeChatWindow();
  }

  /* ─── Chat Window ─── */
  function openChatWindow() {
    chatOpen = true;
    $chat.removeAttr('hidden').show();

    if (chatStarted) {
      // Đã đăng nhập hoặc đã nhập tên → vào thẳng chat
      showMessageView();
      startPolling();
    } else {
      $nameInput.focus();
    }
  }

  function closeChatWindow() {
    chatOpen = false;
    $chat.attr('hidden', true).hide();
    stopPolling();
  }

  /* ─── Bắt đầu chat (khách chưa đăng nhập) ─── */
  function handleStart() {
    var name = $nameInput.val().trim();
    if (!name) {
      $introErr.removeAttr('hidden');
      $nameInput.focus();
      return;
    }
    $introErr.attr('hidden', true);
    userName  = name;
    userEmail = $emailInput.val().trim();
    localStorage.setItem('fsc_name',  userName);
    localStorage.setItem('fsc_email', userEmail);
    chatStarted = true;
    startChatView();
  }

  function startChatView() {
    showMessageView();
    appendMessage('in',
      'Xin chào ' + userName + '! Hãy gửi tin nhắn và chúng tôi sẽ phản hồi sớm nhất có thể.',
      'Admin', new Date()
    );
    startPolling();
    $input.focus();
  }

  function showMessageView() {
    $intro.hide();
    $body.removeAttr('hidden').show();
    $footer.removeAttr('hidden').show();
    scrollBottom();
  }

  /* ─── Gửi tin nhắn ─── */
  function sendMessage() {
    var text = $input.val().trim();
    if (!text) return;
    $input.val('').css('height', 'auto');
    $send.prop('disabled', true);

    appendMessage('out', text, userName, new Date());
    scrollBottom();

    $.post(FSC.ajax_url, {
      action:  'fsc_send',
      nonce:   FSC.nonce,
      session: sessionId,
      name:    userName,
      email:   userEmail,
      message: text,
    })
    .done(function (res) {
      if (res.success && res.data.id) {
        lastMsgId = Math.max(lastMsgId, res.data.id);
      }
    })
    .fail(function () {
      appendMessage('in', '⚠️ Gửi thất bại. Vui lòng thử lại.', 'System', new Date());
    })
    .always(function () {
      $send.prop('disabled', false);
    });
  }

  /* ─── Polling ─── */
  function startPolling() {
    stopPolling();
    poll();
    pollTimer = setInterval(poll, FSC.poll_interval);
  }

  function stopPolling() {
    if (pollTimer) { clearInterval(pollTimer); pollTimer = null; }
  }

  function poll() {
    $.post(FSC.ajax_url, {
      action:  'fsc_poll',
      nonce:   FSC.nonce,
      session: sessionId,
      last_id: lastMsgId,
    })
    .done(function (res) {
      if (!res.success) return;
      $.each(res.data.messages || [], function (i, m) {
        if (parseInt(m.id) > lastMsgId) {
          lastMsgId = parseInt(m.id);
          if (m.sender === 'admin') {
            appendMessage('in', m.message, 'Admin', new Date(m.created_at));
            scrollBottom();
          }
        }
      });
    });
  }

  /* ─── Render bubble ─── */
  function appendMessage(direction, text, name, date) {
    var cls      = direction === 'out' ? 'fsc-out' : 'fsc-in';
    var safeText = escHtml(text).replace(/\n/g, '<br>');
    $messages.append(
      '<div class="fsc-bubble-wrap ' + cls + '">' +
        '<div class="fsc-bubble">' + safeText + '</div>' +
        '<span class="fsc-bubble-time">' + formatTime(date) + '</span>' +
      '</div>'
    );
  }

  function scrollBottom() {
    $body.scrollTop($body[0].scrollHeight);
  }

  function formatTime(d) {
    return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
  }

  function escHtml(str) {
    return $('<div>').text(str).html();
  }

  $(document).ready(init);

})(jQuery);
