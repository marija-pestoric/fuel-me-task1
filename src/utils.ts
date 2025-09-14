export async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if(response.ok){ 
        return response.json() as Promise<T>
    } else {
        throw new Error(`${response.status} error occurred`)
    }
}

export function createLogger(context: string) {
    return function(message: string){
        console.log(`[${context}]: ${message}`)
    }
}