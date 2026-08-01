param([string]$path)

$bannedWords = @(
    "Here is exactly how", "Here's what you need to know", "Here's why", 
    "In conclusion", "Delve into", "Tapestry", "Crucial", "Vital", 
    "Landscape", "Myriad", "Testament", "Ultimately", "Furthermore"
)

$files = Get-ChildItem -Path $path -Include *starbucks*,*dunkin* -Recurse -File

$results = @()

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $wordCount = ($content -split '\s+').Count
    
    $foundBanned = @()
    foreach ($word in $bannedWords) {
        if ($content -match "(?i)\b$word\b") {
            $foundBanned += $word
        }
    }
    
    $protipCount = ([regex]::Matches($content, 'class="callout callout-tip"|<ProTip>')).Count
    
    $imageCount = ([regex]::Matches($content, '!\[.*?\]\(.*?\.webp\)')).Count
    
    $hasFaq = $content -match '(?ms)^faq:\s*\n(\s+- question:.*?\n\s+answer:.*?){2,}'
    
    $results += [PSCustomObject]@{
        File = $file.Name
        WordCount = $wordCount
        BannedWords = $foundBanned -join ", "
        ProTipCount = $protipCount
        ImageCount = $imageCount
        HasValidFaq = $hasFaq
    }
}

$results | ConvertTo-Json -Depth 3
