(function () {
  const MEMBER_LIST_URL = new URL("liste_membres.html", document.currentScript.src).href;

  function normalizeName(str) {
    return String(str || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’‘]/g, "'")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function buildMembersMap(doc) {
    const map = new Map();
    const rows = doc.querySelectorAll("table tbody tr");

    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      if (cells.length < 2) return;

      const name = cells[0].textContent.trim();
      const link = cells[1].querySelector("a");
      const url = link ? link.getAttribute("href") : "";

      if (!name || !url) return;
      map.set(normalizeName(name), url);
    });

    return map;
  }

  function createMentionFragment(text, membersMap) {
    const fragment = document.createDocumentFragment();
    const regex = /@(?:"([^"]+)"|([A-Za-zÀ-ÿÆæŒœ0-9_'’\- ]+))/g;

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(text)) !== null) {
      const fullMatch = match[0];
      const rawName = (match[1] || match[2] || "").trim();
      const normalized = normalizeName(rawName);
      const url = membersMap.get(normalized);

      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
      }

      if (url) {
        const a = document.createElement("a");
        a.href = url;
        a.target = "_top";
        a.className = "forum-mention";
        a.textContent = fullMatch;
        fragment.appendChild(a);
      } else {
        fragment.appendChild(document.createTextNode(fullMatch));
      }

      lastIndex = regex.lastIndex;
    }

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    }

    return fragment;
  }

  function processTextNodes(root, membersMap) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.includes("@")) {
          return NodeFilter.FILTER_REJECT;
        }
        if (!node.parentNode) {
          return NodeFilter.FILTER_REJECT;
        }
        const parentTag = node.parentNode.nodeName;
        if (parentTag === "SCRIPT" || parentTag === "STYLE" || parentTag === "A") {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const textNodes = [];
    let current;

    while ((current = walker.nextNode())) {
      textNodes.push(current);
    }

    textNodes.forEach((node) => {
      const fragment = createMentionFragment(node.nodeValue, membersMap);
      node.parentNode.replaceChild(fragment, node);
    });
  }

  async function initMentions() {
    try {
      const response = await fetch(MEMBER_LIST_URL, { cache: "no-store" });
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const membersMap = buildMembersMap(doc);

      document.querySelectorAll(".quest-members-list, .mentions-auto").forEach((el) => {
        processTextNodes(el, membersMap);
      });
    } catch (error) {
      console.error("Impossible de charger la liste des membres :", error);
    }
  }

  document.addEventListener("DOMContentLoaded", initMentions);
})();
