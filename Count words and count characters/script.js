  function countWordsAndCharacters() {
    const text = document.getElementById("text").value;
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    const characterCount = text.length;
    const characterCountWithoutSpaces = text.replace(/\s/g, '').length;
    const spaceCount = characterCount - characterCountWithoutSpaces;
    
    document.getElementById("wordCount").innerHTML = "Кількість слів: <span>" + wordCount + "</span>";
    document.getElementById("characterCount").innerHTML = "Кількість символів: <span>" + characterCount + "</span>";
    document.getElementById("characterCountWithoutSpaces").innerHTML = "Кількість символів без пробілів: <span>" + characterCountWithoutSpaces + "</span>";
    document.getElementById("spaceCount").innerHTML = "Кількість пробілів: <span>" + spaceCount + "</span>";
  }

  document.getElementById("text").addEventListener("input", countWordsAndCharacters);
  countWordsAndCharacters();