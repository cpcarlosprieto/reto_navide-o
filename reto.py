import tkinter as tk
from random import choice

class DesafioNavideno:
    def __init__(self, master):
        self.master = master
        master.title("Desafío Navideño")
        master.configure(bg="#f0f0f0")  # Color de fondo

        # Marco para organizar mejor los elementos
        marco = tk.Frame(master, bg="#f0f0f0")
        marco.pack(pady=10)

        self.emojis = ["⭐", "🎄", "🎅", "🎁"]
        self.emoji_var = tk.StringVar()
        self.repeticiones_var = tk.StringVar()

        self.label_emoji = tk.Label(marco, text="Elige un emoji:", bg="#f0f0f0")
        self.label_emoji.grid(row=0, column=0, pady=5, padx=10, sticky="w")

        self.boton_emojis = []
        for i, emoji in enumerate(self.emojis):
            boton_emoji = tk.Button(marco, text=emoji, command=lambda e=emoji: self.seleccionar_emoji(e), font=("Arial", 16), bg="#d9d9d9", relief=tk.FLAT)
            boton_emoji.grid(row=0, column=i + 1, pady=5, padx=5)
            self.boton_emojis.append(boton_emoji)

        self.label_repeticiones = tk.Label(marco, text="Número de repeticiones:", bg="#f0f0f0")
        self.label_repeticiones.grid(row=1, column=0, pady=5, padx=10, sticky="w")

        self.repeticiones_entry = tk.Entry(marco, textvariable=self.repeticiones_var)
        self.repeticiones_entry.grid(row=1, column=1, pady=5, padx=5, sticky="w")

        self.verificar_button = tk.Button(marco, text="Verificar", command=self.verificar, font=("Arial", 14), bg="#4caf50", fg="white")
        self.verificar_button.grid(row=1, column=2, pady=5, padx=5, sticky="w")

        self.text_area = tk.Text(master, height=6, width=20, state=tk.DISABLED)  # Hacer el TextArea de solo lectura
        self.text_area.pack(pady=10, padx=10, fill=tk.BOTH, expand=True)

        self.reiniciar_button = tk.Button(master, text="Reiniciar", command=self.reiniciar, font=("Arial", 14), bg="#f44336", fg="white")
        self.reiniciar_button.pack(pady=10, padx=10, fill=tk.BOTH, expand=True)

    def seleccionar_emoji(self, emoji):
        self.emoji_var.set(emoji)
        for boton in self.boton_emojis:
            if boton.cget("text") == emoji:
                boton.config(bg="#66BB6A")  # Color de resaltado
            else:
                boton.config(bg="#d9d9d9")  # Restaurar color

    def mostrar_matriz(self):
        matriz_str = ""
        for row in self.matriz:
            row_str = " ".join(row)
            matriz_str += row_str + "\n"
        self.text_area.config(state=tk.NORMAL)
        self.text_area.delete("1.0", tk.END)
        self.text_area.insert(tk.END, matriz_str)
        self.text_area.config(state=tk.DISABLED)

    def mostrar_resultado(self, mensaje):
        resultado_label = tk.Label(self.master, text=mensaje, font=("Arial", 12), bg="#f0f0f0")
        resultado_label.pack(pady=10)

    def verificar(self):
        emoji_elegido = self.emoji_var.get()
        repeticiones_deseadas = int(self.repeticiones_var.get())

        self.matriz = [[choice(self.emojis) for _ in range(4)] for _ in range(4)]

        self.mostrar_matriz()

        # Contar cuántas veces aparece el emoji en la matriz
        contador = sum(row.count(emoji_elegido) for row in self.matriz)

        mensaje = f"¡Acertaste! El emoji {emoji_elegido} aparece {contador} veces en la matriz." if contador == repeticiones_deseadas else f"¡Oops! No es correcto. El emoji {emoji_elegido} aparece {contador} veces en la matriz."

        self.mostrar_resultado(mensaje)

    def reiniciar(self):
        self.emoji_var.set("")
        self.repeticiones_var.set("")
        for boton in self.boton_emojis:
            boton.config(bg="#d9d9d9")  # Restaurar color
        self.text_area.config(state=tk.NORMAL)
        self.text_area.delete("1.0", tk.END)
        self.text_area.config(state=tk.DISABLED)

        # Borrar mensajes de resultado anteriores
        for widget in self.master.winfo_children():
            if isinstance(widget, tk.Label):
                widget.destroy()

if __name__ == "__main__":
    root = tk.Tk()
    app = DesafioNavideno(root)
    root.mainloop()
