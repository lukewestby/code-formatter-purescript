'use strict';

import * as vscode from 'vscode';

const regex = /(forall|::|->|<-|=>)/g

export function activate(context: vscode.ExtensionContext) {
    vscode.languages.registerDocumentFormattingEditProvider('purescript', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const edits = []
            for (let i = document.lineCount - 1; i >= 0; i--) {
                const line = document.lineAt(i)
                const text = line.text
                if (regex.test(text)) {
                    const replaced = text
                        .replace(/::/g, '∷')
                        .replace(/->/g, '→')
                        .replace(/<-/g, '←')
                        .replace(/=>/g, '⇒')
                        .replace(/forall/g, '∀')
                    edits.push(vscode.TextEdit.replace(line.range, replaced))
                }
            }
            return edits
        }
    });
}
