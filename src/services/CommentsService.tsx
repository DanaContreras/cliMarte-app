export const fetchDailyComments = async (date: string) => {
    let result;
    try {
      const response = await fetch(
        `http://10.0.2.2:3000/api/comentarios/${date}`
      );
      if (!response.ok) {
        result = { success: false, error: `Error: ${response.status} ${response.statusText}` };
      } else {
        const data = await response.json();
        result = { success: true, data };
      }
    } catch (error: any) {
      result = { success: false, error: error.message || 'Error inesperado.' };
    }
    return result;
  };

  export const postDailyComment = async (
    date: string,
    username: string,
    mail: string,
    comment: string
  ) => {
    let result;
    try {
      const response = await fetch(`http://10.0.2.2:3000/api/comentarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha: date,
          nombreUsuario: username,
          mail,
          comentario: comment,
        }),
      });
  
      if (!response.ok) {
        console.log('da error aca:',response.json)
        result = {
          success: false,
          error: `Error: ${response.status} ${response.statusText}`,
        };
      } else {
        const data = await response.json();
        result = { success: true, data };
      }
    } catch (error: any) {
      result = { success: false, error: error.message || 'Error inesperado.' };
    }
    return result;
  };