
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockArticles } from "@/data/mockArticles";
import { Skeleton } from "@/components/ui/skeleton";

function Blog() {
  // Get the first article for the featured spot
  const featuredArticle = mockArticles[1]; // Using the second article since the first one is already shown as headline
  
  // Get the next 2 articles for the smaller spots
  const smallArticles = mockArticles.slice(2, 4);

  return (
    <div className="w-full py-8 lg:py-12">
      <div className="container px-0 mx-auto flex flex-col gap-8">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h4 className="text-3xl md:text-4xl tracking-tighter font-medium">
            Latest articles
          </h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Featured Article (larger) */}
          <div className="flex flex-col gap-4 hover:opacity-90 transition-opacity cursor-pointer md:col-span-2">
            <div className="rounded-md aspect-video overflow-hidden">
              {featuredArticle.imageUrl ? (
                <img 
                  src={featuredArticle.imageUrl} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Skeleton className="w-full h-full" />
              )}
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Badge>{featuredArticle.category}</Badge>
              <p className="flex flex-row gap-2 text-sm items-center">
                <span className="text-muted-foreground">By</span>{" "}
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {featuredArticle.author.split(' ')[0][0] + featuredArticle.author.split(' ')[1][0]}
                  </AvatarFallback>
                </Avatar>
                <span>{featuredArticle.author}</span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="max-w-3xl text-3xl tracking-tight font-medium">
                {featuredArticle.title}
              </h3>
              <p className="max-w-3xl text-muted-foreground text-base">
                {featuredArticle.excerpt}
              </p>
            </div>
          </div>
          
          {/* Smaller Articles */}
          {smallArticles.map((article, index) => (
            <div key={article.id} className="flex flex-col gap-4 hover:opacity-90 transition-opacity cursor-pointer">
              <div className="rounded-md aspect-video overflow-hidden">
                {article.imageUrl ? (
                  <img 
                    src={article.imageUrl} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Skeleton className="w-full h-full" />
                )}
              </div>
              <div className="flex flex-row gap-4 items-center">
                <Badge>{article.category}</Badge>
                <p className="flex flex-row gap-2 text-sm items-center">
                  <span className="text-muted-foreground">By</span>{" "}
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                      {article.author.split(' ')[0][0] + article.author.split(' ')[1][0]}
                    </AvatarFallback>
                  </Avatar>
                  <span>{article.author}</span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="max-w-3xl text-xl tracking-tight font-medium">
                  {article.title}
                </h3>
                <p className="max-w-3xl text-muted-foreground text-base">
                  {article.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { Blog };
