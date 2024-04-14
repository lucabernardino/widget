export default {
    unique_id: function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const txt = 'unique_id';
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText(txt, 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText(txt, 4, 17);
      
        const data = canvas.toDataURL();

        let hash = 0, i, chr;
        for (i = 0; i < data.length; i++) {
          chr   = data.charCodeAt(i);
          hash  = ((hash << 5) - hash) + chr;
          hash |= 0; // Convert to 32bit integer
        }
        return hash;
      },

      hash: function (input) {
        let hash = 0, i, chr;
        for (i = 0; i < input.length; i++) {
          chr   = input.charCodeAt(i);
          hash  = ((hash << 5) - hash) + chr;
          hash |= 0; // Convert to 32bit integer
        }
        return hash;
      }   
}