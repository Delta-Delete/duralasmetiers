(function () {
  const rawMembers = window.DURALAS_MEMBERS || {};

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalizeName(str) {
    return String(str || "")
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  const members = {};
  Object.keys(rawMembers).forEach(function (name) {
    members[normalizeName(name)] = rawMembers[name];
  });

  function makeMentionLink(rawName, originalText) {
    const url = members[normalizeName(rawName)];
    if (!url) return originalText;
    return '<a href="' + escapeHtml(url) + '" class="forum-mention">' + escapeHtml(originalText) + '</a>';
  }

  function transformMentions(text) {
    return text.replace(/@(?:"([^"]+)"|([A-Za-zÀ-ÿ0-9_'’\- ]+))/g, function (match, quotedName, plainName) {
      const name = (quotedName || plainName || "").trim();
      return makeMentionLink(name, match);
    });
  }

  function processElement(el) {
    el.innerHTML = transformMentions(el.innerHTML);
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".quest-members-list, .mentions-auto").forEach(processElement);
  });
})();
