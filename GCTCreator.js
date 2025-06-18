function hexToBytes(hex) {
    const cleanHex = hex.replace(/[^0-9A-Fa-f]/g, "");
    const bytes = [];
    for (let i = 0; i < cleanHex.length; i += 2) {
        bytes.push(parseInt(cleanHex.substr(i, 2), 16));
    }
    return bytes;
}

function downloadGCT() {
    const gameID = document.getElementById("GameID").value.trim();
    const rawCodes = document.getElementById("code").value;

    if (!gameID || !/^[A-Z0-9]{6}$/.test(gameID)) {
        alert("Enter a valid Game ID.");
        return;
    }

    const startHeader = "00D0C0DE00D0C0DE";
    const endFooter = "F000000000000000";

    const combined = startHeader + rawCodes.replace(/\s+/g, "") + endFooter;
    const byteArray = hexToBytes(combined);

    const blob = new Blob([new Uint8Array(byteArray)], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${gameID}.gct`;
    link.click();
}
