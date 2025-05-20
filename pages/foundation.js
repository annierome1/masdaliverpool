// pages/foundation.js
export async function getServerSideProps() {
  // you can also hard-code this URL, or pull from process.env
  const pdfUrl =
    'https://masdaliverpool.s3.us-east-2.amazonaws.com/masdabrouchurer.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAREBR5QXBZU4RU36X%2F20250520%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20250520T142625Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMiJHMEUCIQC4TzVEoEcyMORenku3dIEo1ed0TOVR0Cvsohodap8EfgIgUU5KsZMfq0pUovrtWbAyy15JxuSDypxyjjIHecK1QjEq3wIIqP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwwNzc0MTQxMDY1NjMiDKXqFfeaTb0kJ76PfiqzAnuNg0NMO9gkiOw44HqRgQq3PGqdwcd5YT7M98DIeZumJOmz52dTxEj%2FSquPagSSwV01lhaINSS8QFfkp5DNRUTWk0qEHmNRG74RJebM21PcjD2bEczXEGv8qRNXW6kX%2Bnn8OJZi9in8FTopIHXFC1irF%2FHJggCznur1DYSDmhVhpfZV5oPOOXeiehUnNlO0bqp%2BdkCCm%2FWQvvconTl4pfNkLdL4DkFnEMMgpEK6PnQ0eNjBtzf7TqYJO4BwoNNf87KWdzOLJkk0ZPMf8d7gBo0JfqY4ErS4lJ6qre9ltMNpLgnvyHosxDSq6Ke1cbHwYT9p0zli3nKyYvfBHai%2Bviyyx%2B9Rf02VoMJZlbq1AOGCltsIF13GIsKt%2F89%2BPMr5C4t2u10gC7k9C9239JHFs1Q8QRQwsaCywQY6rQIRMttffgAfwE2rn%2F5BOsOd5VBDJ3EeV%2B8TTN4t45WxwNm%2BhKunUbKXS3ScBJEol6V8wuY%2Fku3GZQWOOE7AzUO9BW0%2B%2B%2FCfXTCNy71f3Ktf3TwWUcVimt8gx6qxQW4FN13ltJ27C%2FcpmlKhOYqwHBWBvEyKZu7KKO1zs4Z%2BdoTy7%2BWmtsoTEAC2cJikj8wgAWcF7j2tjxDqzizbLN0xGKhAJeg18ixV5SWxE%2BcoEsqXLVELFuPSQ0Aev8DAeiw%2Fdeq4BR5WXfv4hGOgbvgYOB88mL6inpDgjzsa8PEVEn0LBiefMjycFB7XZDStcgFhhggxL9qQ6hFD4cIdVHHvCmGwfai4JXoNuwkDeUsSTpjU1f9OOPvHlm3GpeVSLTWhiNZ%2BIclIBhm2oT5Ri%2BfQ&X-Amz-Signature=10fd4c750b490497762ff0600cda605b319a01c1000d1226df4ef5f6d98ca75a&X-Amz-SignedHeaders=host&response-content-disposition=inline'

  return {
    redirect: {
      destination: pdfUrl,
      permanent: false,
    },
  }
}

// this component never actually renders—Next.js handles the redirect
export default function Foundation() {
  return null
}
