import {chromium} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
const base=process.env.VERIFY_URL||'http://127.0.0.1:4176/vela-iots-trial/';
const browser=await chromium.launch({channel:'msedge',headless:true});
const page=await browser.newPage();const failures=[];const results=[];
page.on('pageerror',e=>failures.push(e.message));page.on('console',m=>{if(m.type()==='error')failures.push(m.text());});page.on('response',r=>{if(r.status()>=400)failures.push(`${r.status()} ${r.url()}`);});
for(const route of ['', 'blog/','locations/','contact/']){
 const response=await page.goto(base+route,{waitUntil:'networkidle'});
 const result=await page.evaluate(()=>({url:location.href,title:document.title,h1:document.querySelector('h1')?.textContent,imagesLoaded:[...document.images].every(i=>i.complete&&i.naturalWidth>0),links:[...document.querySelectorAll('a')].filter(a=>a.origin===location.origin&&a.getAttribute('href')!=='#main').map(a=>a.pathname)}));
 if(response.status()!==200||!result.h1||!result.imagesLoaded||result.links.some(h=>!h.startsWith('/vela-iots-trial/')))failures.push(result);
 results.push(result);
}
await page.goto(base+'locations/');await page.getByRole('searchbox').fill('Berwyn');if(await page.locator('.office:visible').count()!==1)failures.push('Search failed');
await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Menu'}).click();await page.locator('nav').getByRole('link',{name:'Contact',exact:true}).click();if(page.url()!==base+'contact/')failures.push('Mobile navigation failed');
await writeFile(process.env.VERIFY_REPORT||'docs/reference/subpath-check.json',JSON.stringify({base,checkedAt:new Date().toISOString(),results,failures},null,2));console.log(JSON.stringify({pages:results.length,failures}));await browser.close();if(failures.length)process.exitCode=1;
