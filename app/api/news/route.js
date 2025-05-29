export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || 'general';

    try {
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.NEWS_API_KEY}`
        );

        const data = await response.json();

        if (!response.ok) {
            return new Response(JSON.stringify({ error: data.message }), { status: response.status });
        }

        return new Response(JSON.stringify({ articles: data.articles }), { status: 200 });
    } catch (error) {
        console.error('Error fetching news:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
