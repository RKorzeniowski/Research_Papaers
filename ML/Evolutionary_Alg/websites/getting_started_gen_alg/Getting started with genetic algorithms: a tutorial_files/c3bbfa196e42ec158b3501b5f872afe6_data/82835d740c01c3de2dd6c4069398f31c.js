document.write('<link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist-embed-357067cd85e7.css">')
document.write('<div id=\"gist75082431\" class=\"gist\">\n    <div class=\"gist-file\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-mutation-py\" class=\"file\">\n    \n\n  <div itemprop=\"text\" class=\"blob-wrapper data type-python\">\n      <table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\">\n      <tr>\n        <td id=\"file-mutation-py-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"><\/td>\n        <td id=\"file-mutation-py-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">import<\/span> random<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-mutation-py-L2\" class=\"blob-num js-line-number\" data-line-number=\"2\"><\/td>\n        <td id=\"file-mutation-py-LC2\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-mutation-py-L3\" class=\"blob-num js-line-number\" data-line-number=\"3\"><\/td>\n        <td id=\"file-mutation-py-LC3\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">def<\/span> <span class=\"pl-en\">mutateWord<\/span>(<span class=\"pl-smi\">word<\/span>):<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-mutation-py-L4\" class=\"blob-num js-line-number\" data-line-number=\"4\"><\/td>\n        <td id=\"file-mutation-py-LC4\" class=\"blob-code blob-code-inner js-file-line\">	index_modification <span class=\"pl-k\">=<\/span> <span class=\"pl-c1\">int<\/span>(random.random() <span class=\"pl-k\">*<\/span> <span class=\"pl-c1\">len<\/span>(word))<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-mutation-py-L5\" class=\"blob-num js-line-number\" data-line-number=\"5\"><\/td>\n        <td id=\"file-mutation-py-LC5\" class=\"blob-code blob-code-inner js-file-line\">	<span class=\"pl-k\">if<\/span> (index_modification <span class=\"pl-k\">==<\/span> <span class=\"pl-c1\">0<\/span>):<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-mutation-py-L6\" class=\"blob-num js-line-number\" data-line-number=\"6\"><\/td>\n        <td id=\"file-mutation-py-LC6\" class=\"blob-code blob-code-inner js-file-line\">		word <span class=\"pl-k\">=<\/span> <span class=\"pl-c1\">chr<\/span>(<span class=\"pl-c1\">97<\/span> <span class=\"pl-k\">+<\/span> <span class=\"pl-c1\">int<\/span>(<span class=\"pl-c1\">26<\/span> <span class=\"pl-k\">*<\/span> random.random())) <span class=\"pl-k\">+<\/span> word[<span class=\"pl-c1\">1<\/span>:]<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-mutation-py-L7\" class=\"blob-num js-line-number\" data-line-number=\"7\"><\/td>\n        <td id=\"file-mutation-py-LC7\" class=\"blob-code blob-code-inner js-file-line\">	<span class=\"pl-k\">else<\/span>:<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-mutation-py-L8\" class=\"blob-num js-line-number\" data-line-number=\"8\"><\/td>\n        <td id=\"file-mutation-py-LC8\" class=\"blob-code blob-code-inner js-file-line\">		word <span class=\"pl-k\">=<\/span> word[:index_modification] <span class=\"pl-k\">+<\/span> <span class=\"pl-c1\">chr<\/span>(<span class=\"pl-c1\">97<\/span> <span class=\"pl-k\">+<\/span> <span class=\"pl-c1\">int<\/span>(<span class=\"pl-c1\">26<\/span> <span class=\"pl-k\">*<\/span> random.random())) <span class=\"pl-k\">+<\/span> word[index_modification<span class=\"pl-k\">+<\/span><span class=\"pl-c1\">1<\/span>:]<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-mutation-py-L9\" class=\"blob-num js-line-number\" data-line-number=\"9\"><\/td>\n        <td id=\"file-mutation-py-LC9\" class=\"blob-code blob-code-inner js-file-line\">	<span class=\"pl-k\">return<\/span> word<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-mutation-py-L10\" class=\"blob-num js-line-number\" data-line-number=\"10\"><\/td>\n        <td id=\"file-mutation-py-LC10\" class=\"blob-code blob-code-inner js-file-line\">	<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-mutation-py-L11\" class=\"blob-num js-line-number\" data-line-number=\"11\"><\/td>\n        <td id=\"file-mutation-py-LC11\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">def<\/span> <span class=\"pl-en\">mutatePopulation<\/span>(<span class=\"pl-smi\">population<\/span>, <span class=\"pl-smi\">chance_of_mutation<\/span>):<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-mutation-py-L12\" class=\"blob-num js-line-number\" data-line-number=\"12\"><\/td>\n        <td id=\"file-mutation-py-LC12\" class=\"blob-code blob-code-inner js-file-line\">	<span class=\"pl-k\">for<\/span> i <span class=\"pl-k\">in<\/span> <span class=\"pl-c1\">range<\/span>(<span class=\"pl-c1\">len<\/span>(population)):<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-mutation-py-L13\" class=\"blob-num js-line-number\" data-line-number=\"13\"><\/td>\n        <td id=\"file-mutation-py-LC13\" class=\"blob-code blob-code-inner js-file-line\">		<span class=\"pl-k\">if<\/span> random.random() <span class=\"pl-k\">*<\/span> <span class=\"pl-c1\">100<\/span> <span class=\"pl-k\">&lt;<\/span> chance_of_mutation:<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-mutation-py-L14\" class=\"blob-num js-line-number\" data-line-number=\"14\"><\/td>\n        <td id=\"file-mutation-py-LC14\" class=\"blob-code blob-code-inner js-file-line\">			population[i] <span class=\"pl-k\">=<\/span> mutateWord(population[i])<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-mutation-py-L15\" class=\"blob-num js-line-number\" data-line-number=\"15\"><\/td>\n        <td id=\"file-mutation-py-LC15\" class=\"blob-code blob-code-inner js-file-line\">	<span class=\"pl-k\">return<\/span> population<\/td>\n      <\/tr>\n<\/table>\n\n\n  <\/div>\n\n  <\/div>\n  \n<\/div>\n\n      <\/div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/NicolleLouis/82835d740c01c3de2dd6c4069398f31c/raw/cdd9efff6f924ffd9d665f20a22f190d98c74dce/mutation.py\" style=\"float:right\">view raw<\/a>\n        <a href=\"https://gist.github.com/NicolleLouis/82835d740c01c3de2dd6c4069398f31c#file-mutation-py\">mutation.py<\/a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n      <\/div>\n    <\/div>\n<\/div>\n')
