document.addEventListener("DOMContentLoaded", function () {
  const emojis = ["⭐", "🎄", "🎅", "🎁"];

  const app = document.getElementById("app");
  const emojiContainer = document.getElementById("emoji-container");
  const gameContainer = document.getElementById("game-container");
  const emojiSelect = document.getElementById("emoji-select");
  const repeticionesInput = document.getElementById("repeticiones-input");
  const verificarBtn = document.getElementById("verificar-btn");
  const matrizContainer = document.getElementById("matriz-container");
  const resultadoContainer = document.getElementById("resultado-container");
  const reiniciarBtn = document.getElementById("reiniciar-btn");

  const selectedEmojiElement = document.getElementById("selected-emoji");
  const selectedRepeticionesElement = document.getElementById(
    "selected-repeticiones"
  );
  const emojiCountElement = document.getElementById("emoji-count");
  const resultMessageElement = document.getElementById("result-message");

  const createButton = (emoji) => {
    const button = document.createElement("button");
    button.textContent = emoji;
    button.addEventListener("click", () => selectEmoji(emoji));
    return button;
  };

  const selectEmoji = (selectedEmoji) => {
    emojiSelect.value = selectedEmoji;
  };

  const renderEmojiButtons = () => {
    emojis.forEach((emoji) => {
      const button = createButton(emoji);
      emojiContainer.appendChild(button);
    });
  };

  const renderSelectOptions = () => {
    emojis.forEach((emoji) => {
      const option = document.createElement("option");
      option.value = emoji;
      option.textContent = emoji;
      emojiSelect.appendChild(option);
    });
  };

  const renderMatriz = (matriz) => {
    matrizContainer.innerHTML = ""; // Limpiar contenido previo
    matriz.forEach((row) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "matriz-row";
      row.forEach((emoji) => {
        const emojiSpan = document.createElement("span");
        emojiSpan.textContent = emoji;
        rowDiv.appendChild(emojiSpan);
      });
      matrizContainer.appendChild(rowDiv);
    });
  };

  const mostrarResultado = (mensaje) => {
    resultadoContainer.textContent = mensaje;
  };

  const actualizarTarjeta = (
    emojiElegido,
    repeticionesDeseadas,
    contador,
    resultado
  ) => {
    selectedEmojiElement.innerHTML = `<strong>Emoji seleccionado: </strong> ${emojiElegido}`;
    selectedRepeticionesElement.innerHTML = `<strong>Repeticiones seleccionadas: </strong> ${repeticionesDeseadas}`;
    emojiCountElement.innerHTML = `<strong>Repeticiones encontradas en la matriz: </strong> ${contador}`;
    resultMessageElement.innerHTML = `<strong>Resultado: </strong> ${resultado}`;
  };

  const reiniciarJuego = () => {
    repeticionesInput.value = "";
    emojiSelect.value = "";
    resultadoContainer.textContent = "";

    // Borrar mensajes de resultado anteriores
    matrizContainer.innerHTML = "";

    // Limpiar opciones seleccionadas
    emojis.forEach((emoji) => {
      emojiContainer
        .querySelector(`button:contains('${emoji}')`)
        .classList.remove("selected");
    });

    // Limpiar tarjeta
    actualizarTarjeta("", "", "", "");
  };

  const verificarJuego = () => {
    const emojiElegido = emojiSelect.value;
    const repeticionesDeseadas = parseInt(repeticionesInput.value, 10);

    const matriz = Array.from({ length: 4 }, () =>
      Array.from(
        { length: 4 },
        () => emojis[Math.floor(Math.random() * emojis.length)]
      )
    );

    renderMatriz(matriz);

    // Contar cuántas veces aparece el emoji en la matriz
    const contador = matriz
      .flat()
      .filter((emoji) => emoji === emojiElegido).length;

    const mensaje =
      contador === repeticionesDeseadas
        ? `¡Acertaste! El emoji ${emojiElegido} aparece ${contador} veces en la matriz.`
        : `¡Oops! No es correcto. El emoji ${emojiElegido} aparece ${contador} veces en la matriz.`;

    mostrarResultado(mensaje);
    // Nueva función para actualizar la tarjeta
    actualizarTarjeta(emojiElegido, repeticionesDeseadas, contador, mensaje);
  };

  // Event Listeners
  verificarBtn.addEventListener("click", verificarJuego);
  reiniciarBtn.addEventListener("click", reiniciarJuego);

  renderEmojiButtons();
  renderSelectOptions();
});
